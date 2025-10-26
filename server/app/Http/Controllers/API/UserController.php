<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Models\User;
use App\Models\Restaurant;
use App\Models\MenuItem;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Reservation;
use App\Models\Notification;
use App\Models\RestaurantRating;
use App\Models\CartItem;
use App\Models\RoleChangeRequest;
use App\Jobs\SendNotification;

class UserController extends Controller
{
    public function getRestaurants(Request $request)
    {
        $query = Restaurant::query();
        if ($request->filled('type')) $query->where('type', $request->type);
        if ($request->filled('service_type')) $query->where('service_type', $request->service_type);
        return response()->json($query->with('menuItems.variants')->paginate(10));
    }

    public function getMenu(Request $request, $restaurant_id)
    {
        $query = MenuItem::where('restaurant_id', $restaurant_id)->with('variants');
        if ($request->filled('type')) $query->where('type', $request->type);
        if ($request->filled('search')) $query->where('name', 'like', '%' . $request->search . '%');
        return response()->json($query->paginate(10));
    }

    public function updateProfile(Request $request)
    {
        $user = Auth::user();
        $request->validate([
            'name' => 'sometimes|string|max:255',
            'profile_image' => 'sometimes|image|max:2048',
            'avatar' => 'sometimes|image|max:2048',
            'latitude' => 'sometimes|numeric',
            'longitude' => 'sometimes|numeric',
            'phone' => 'sometimes|string|max:255',
            'birth_date' => 'sometimes|date',
        ]);
        if ($request->hasFile('profile_image')) {
            if ($user->profile_image && Storage::disk('public')->exists($user->profile_image)) {
                Storage::disk('public')->delete($user->profile_image);
            }
            $user->profile_image = $request->file('profile_image')->store('profile_images', 'public');
        }
        if ($request->hasFile('avatar')) {
            if ($user->avatar && Storage::disk('public')->exists($user->avatar)) {
                Storage::disk('public')->delete($user->avatar);
            }
            $user->avatar = $request->file('avatar')->store('avatars', 'public');
        }
        $user->fill($request->only('name', 'latitude', 'longitude', 'phone', 'birth_date'))->save();
        return response()->json($user);
    }

    public function placeOrder(Request $request)
    {
        $user = Auth::user();
        $request->validate([
            'restaurant_id' => 'required|exists:restaurants,id',
            'items' => 'required|array',
            'items.*.menu_item_id' => 'required|exists:menu_items,id',
            'items.*.menu_item_variant_id' => 'nullable|exists:menu_item_variants,id',
            'items.*.quantity' => 'required|integer|min:1',
            'note' => 'nullable|string|max:1000'
        ]);
        $total = 0;
        foreach ($request->items as $item) {
            $menuItem = MenuItem::findOrFail($item['menu_item_id']);
            $price = $menuItem->price;
            if (!empty($item['menu_item_variant_id'])) {
                $variant = $menuItem->variants()->find($item['menu_item_variant_id']);
                if ($variant) $price = $variant->price;
            }
            $total += $price * $item['quantity'];
        }
        $order = Order::create([
            'user_id' => $user->id,
            'restaurant_id' => $request->restaurant_id,
            'status' => 'pending',
            'total_price' => $total,
            'note' => $request->note ?? null
        ]);
        foreach ($request->items as $item) {
            $menuItem = MenuItem::findOrFail($item['menu_item_id']);
            $price = $menuItem->price;
            if (!empty($item['menu_item_variant_id'])) {
                $variant = $menuItem->variants()->find($item['menu_item_variant_id']);
                if ($variant) $price = $variant->price;
            }
            OrderItem::create([
                'order_id' => $order->id,
                'menu_item_id' => $item['menu_item_id'],
                'menu_item_variant_id' => $item['menu_item_variant_id'] ?? null,
                'quantity' => $item['quantity'],
                'price' => $price
            ]);
        }
        SendNotification::dispatch($order, 'restaurant', 'New order received');
        return response()->json($order->load('orderItems.menuItem.variants', 'restaurant', 'courier'));
    }

    public function cancelOrder($order_id)
    {
        $user = Auth::user();
        $order = Order::where('user_id', $user->id)->findOrFail($order_id);
        if (in_array($order->status, ['pending', 'accepted', 'preparing'])) {
            $order->update(['status' => 'canceled_by_user']);
            SendNotification::dispatch($order, 'restaurant', 'Order canceled by user');
            return response()->json(['message' => 'Order canceled']);
        }
        return response()->json(['message' => 'Cannot cancel this order'], 400);
    }

    public function makeReservation(Request $request)
    {
        $user = Auth::user();
        $request->validate([
            'restaurant_id' => 'required|exists:restaurants,id',
            'table_number' => 'required|integer|min:1',
            'reservation_time' => 'required|date'
        ]);
        $reservation = Reservation::create([
            'user_id' => $user->id,
            'restaurant_id' => $request->restaurant_id,
            'status' => 'pending',
            'table_number' => $request->table_number,
            'reservation_time' => $request->reservation_time
        ]);
        SendNotification::dispatch($reservation, 'restaurant', 'New reservation request');
        return response()->json($reservation);
    }

    public function cancelReservation($reservation_id)
    {
        $user = Auth::user();
        $reservation = Reservation::where('user_id', $user->id)->findOrFail($reservation_id);
        if (in_array($reservation->status, ['pending', 'accepted', 'in_progress'])) {
            $reservation->update(['status' => 'canceled_by_user']);
            SendNotification::dispatch($reservation, 'restaurant', 'Reservation canceled by user');
            return response()->json(['message' => 'Reservation canceled']);
        }
        return response()->json(['message' => 'Cannot cancel this reservation'], 400);
    }

    public function rateRestaurant(Request $request, $order_id)
    {
        $user = Auth::user();
        $order = Order::where('id', $order_id)
                      ->where('user_id', $user->id)
                      ->where('status', 'delivered')
                      ->firstOrFail();
        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'review' => 'nullable|string|max:1000'
        ]);
        $rating = RestaurantRating::updateOrCreate(
            ['order_id' => $order->id],
            [
                'user_id' => $user->id,
                'restaurant_id' => $order->restaurant_id,
                'rating' => $request->rating,
                'review' => $request->review
            ]
        );
        SendNotification::dispatch($rating, 'restaurant', 'Your restaurant received a new rating');
        return response()->json($rating);
    }

    public function notifications()
    {
        return response()->json(
            Notification::where('user_id', Auth::id())->orderBy('created_at', 'desc')->paginate(10)
        );
    }

    public function ordersHistory(Request $request)
    {
        $user = Auth::user();
        $query = Order::where('user_id', $user->id)->with(['orderItems.menuItem.variants', 'restaurant', 'courier']);
        if ($request->filled('status')) $query->where('status', $request->status);
        if ($request->filled('from_date')) $query->whereDate('created_at', '>=', $request->from_date);
        if ($request->filled('to_date')) $query->whereDate('created_at', '<=', $request->to_date);
        return response()->json($query->latest()->paginate(10));
    }

    public function upgradeRole(Request $request)
    {
        $request->validate([
            'role' => 'required|in:restaurant,courier'
        ]);
        $user = Auth::user();
        $user->syncRoles($request->role);
        return response()->json(['message' => "Your role has been updated to {$request->role}"]);
    }

    public function getCart()
    {
        $user = Auth::user();
        $cartItems = CartItem::with(['menuItem', 'variant'])->where('user_id', $user->id)->get();
        return response()->json($cartItems);
    }

    public function addToCart(Request $request)
    {
        $request->validate([
            'menu_item_id' => 'required|exists:menu_items,id',
            'menu_item_variant_id' => 'nullable|exists:menu_item_variants,id',
            'quantity' => 'required|integer|min:1',
            'price' => 'nullable|numeric'
        ]);
        $user = Auth::user();
        $cartItem = CartItem::updateOrCreate(
            [
                'user_id' => $user->id,
                'menu_item_id' => $request->menu_item_id,
                'menu_item_variant_id' => $request->menu_item_variant_id,
            ],
            [
                'quantity' => $request->quantity,
                'price' => $request->price ?? null,
            ]
        );
        return response()->json($cartItem);
    }

    public function updateCart(Request $request, $id)
    {
        $request->validate(['quantity' => 'required|integer|min:1']);
        $cartItem = CartItem::findOrFail($id);
        $cartItem->update(['quantity' => $request->quantity]);
        return response()->json($cartItem);
    }

    public function removeCartItem($id)
    {
        $cartItem = CartItem::findOrFail($id);
        $cartItem->delete();
        return response()->json(['message' => 'Cart item removed']);
    }

    public function clearCart()
    {
        $user = Auth::user();
        CartItem::where('user_id', $user->id)->delete();
        return response()->json(['message' => 'Cart cleared']);
    }

    public function requestRoleChange(Request $request)
    {
        $request->validate(['requested_role' => 'required|string|in:restaurant,courier']);
        $user = Auth::user();
        $roleRequest = RoleChangeRequest::create([
            'user_id' => $user->id,
            'requested_role' => $request->requested_role,
            'status' => 'pending',
            'note' => $request->note ?? null,
            'phone' => $user->phone ?? null
        ]);
        return response()->json($roleRequest);
    }
}
