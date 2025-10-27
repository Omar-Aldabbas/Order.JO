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
use App\Models\Notification;
use App\Models\RestaurantRating;
use App\Models\CartItem;
use App\Models\RoleChangeRequest;
use App\Jobs\SendNotification;

class UserController extends Controller
{
    public function updateProfile(Request $request)
    {
        $user = Auth::user();
        $request->validate([
            'name' => 'sometimes|string|max:255',
            'avatar' => 'sometimes|image|max:2048',
            'phone' => 'sometimes|string|max:255',
            'address' => 'sometimes|string|max:255',
            'birth_date' => 'sometimes|date',
        ]);

        if ($request->hasFile('avatar')) {
            if ($user->avatar && Storage::disk('public')->exists($user->avatar)) {
                Storage::disk('public')->delete($user->avatar);
            }
            $user->avatar = $request->file('avatar')->store('avatars', 'public');
        }

        $user->fill($request->only('name', 'phone', 'address', 'birth_date'))->save();
        return response()->json($user);
    }

    public function getRestaurants(Request $request)
    {
        $query = Restaurant::query();

        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        if ($request->filled('service_type')) {
            $query->where(function ($q) use ($request) {
                $q->where('service_type', $request->service_type)
                  ->orWhere('service_type', 'both');
            });
        }

        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $types = Restaurant::select('type')->distinct()->pluck('type');
        $serviceTypes = ['order', 'reservation', 'both'];

        $restaurants = $query->with('menuItems.variants')->paginate(10);

        return response()->json([
            'filters' => [
                'types' => $types,
                'service_types' => $serviceTypes
            ],
            'restaurants' => $restaurants
        ]);
    }

    public function getMenu(Request $request, $restaurant_id)
    {
        $query = MenuItem::where('restaurant_id', $restaurant_id)->with('variants');
        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }
        return response()->json($query->paginate(10));
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

    public function placeOrder(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'restaurant_id' => 'required|exists:restaurants,id',
            'items' => 'required|array|min:1',
            'items.*.menu_item_id' => 'required|exists:menu_items,id',
            'items.*.menu_item_variant_id' => 'nullable|exists:menu_item_variants,id',
            'items.*.quantity' => 'required|integer|min:1',
            'note' => 'nullable|string|max:1000',
            'type' => 'required|in:pickup,delivery'
        ]);

        $restaurant = Restaurant::findOrFail($request->restaurant_id);
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

        $fromAddress = $restaurant->address;
        $toAddress = $request->type === 'pickup' ? $restaurant->address : ($user->address ?? 'Unknown');

        $order = Order::create([
            'user_id' => $user->id,
            'restaurant_id' => $restaurant->id,
            'status' => 'pending',
            'type' => $request->type,
            'total_price' => $total,
            'note' => $request->note,
            'from_address' => $fromAddress,
            'to_address' => $toAddress
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

        CartItem::where('user_id', $user->id)->delete();

        SendNotification::dispatch($order, 'restaurant', 'New order received from ' . $user->name);

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

    public function updateLocation(Request $request, Order $order)
    {
        $user = Auth::user();
        if ($order->user_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'to_address' => 'required|string|max:255',
        ]);

        $order->update([
            'to_address' => $request->to_address,
        ]);

        return response()->json($order);
    }

    public function notifications()
    {
        return response()->json(
            Notification::where('user_id', Auth::id())->orderBy('created_at', 'desc')->paginate(10)
        );
    }
}
