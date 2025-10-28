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
use App\Events\OrderPlaced;
use App\Events\OrderCanceled;
use App\Events\RestaurantRated;

class UserController extends Controller
{
    public function getProfile(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'user' => $user,
            'role' => $user->role,
        ]);
    }

    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'name' => 'sometimes|string|max:255',
            'phone' => 'nullable|string|max:20',
            'avatar' => 'nullable|image|max:2048',
            'address' => 'nullable|string|max:500',
            'birth_date' => 'nullable|date',
        ]);

        $user->name = $request->input('name', $user->name);
        $user->phone = $request->input('phone', $user->phone);
        $user->address = $request->input('address', $user->address);
        $user->birth_date = $request->input('birth_date', $user->birth_date);

        if ($request->hasFile('avatar')) {
            if ($user->avatar && Storage::disk('public')->exists($user->avatar)) {
                Storage::disk('public')->delete($user->avatar);
            }
            $user->avatar = $request->file('avatar')->store('avatars', 'public');
        }

        $user->save();

        return response()->json([
            'message' => 'Profile updated successfully',
            'user' => $user,
        ]);
    }

    public function getRestaurants(Request $request)
    {
        $query = Restaurant::query();

        if ($request->filled('type')) $query->where('type', $request->type);

        if ($request->filled('service_type')) {
            $query->where(function ($q) use ($request) {
                $q->where('service_type', $request->service_type)
                  ->orWhere('service_type', 'both');
            });
        }

        if ($request->filled('search')) $query->where('name', 'like', '%' . $request->search . '%');

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

    public function getMenu(Request $request, $restaurant_id = null)
    {
        $query = MenuItem::with(['variants', 'restaurant']);

        if ($restaurant_id) $query->where('restaurant_id', $restaurant_id);

        if ($request->filled('search')) $query->where('name', 'like', '%' . $request->search . '%');
        if ($request->filled('type')) $query->where('type', $request->type);
        if ($request->filled('min_price')) $query->where('price', '>=', $request->min_price);
        if ($request->filled('max_price')) $query->where('price', '<=', $request->max_price);
        if ($request->filled('has_variants')) $query->where('has_variants', $request->has_variants ? 1 : 0);

        if ($request->filled('price_order') && in_array($request->price_order, ['asc', 'desc'])) $query->orderBy('price', $request->price_order);
        else $query->orderBy('created_at', 'desc');

        return response()->json($query->paginate(12));
    }

    public function relatedRestaurants($restaurant_id)
    {
        $restaurant = Restaurant::findOrFail($restaurant_id);

        $related = Restaurant::where('type', $restaurant->type)
            ->where('id', '!=', $restaurant->id)
            ->limit(6)
            ->get();

        return response()->json([
            'related_restaurants' => $related
        ]);
    }

    public function getCart()
    {
        $user = Auth::user();

        $cartItems = CartItem::with(['menuItem.variants'])
            ->where('user_id', $user->id)
            ->get();

        $restaurantId = $cartItems->pluck('menuItem.restaurant_id')->unique()->first();

        $restaurant = $restaurantId ? Restaurant::find($restaurantId) : null;

        return response()->json([
            'restaurant' => $restaurant ? [
                'id' => $restaurant->id,
                'name' => $restaurant->name,
                'address' => $restaurant->address,
                'type' => $restaurant->type,
            ] : null,
            'items' => $cartItems
        ]);
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
        $menuItem = MenuItem::findOrFail($request->menu_item_id);

        $existingRestaurantId = CartItem::where('user_id', $user->id)
            ->with('menuItem')
            ->get()
            ->pluck('menuItem.restaurant_id')
            ->unique()
            ->first();

        if ($existingRestaurantId && $existingRestaurantId != $menuItem->restaurant_id) {
            return response()->json([
                'message' => 'You can only order from one restaurant at a time. Please clear your cart to order from another restaurant.'
            ], 400);
        }

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
            if ($menuItem->restaurant_id != $restaurant->id) return response()->json(['message' => 'All items must be from the selected restaurant.'], 400);

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

        event(new OrderPlaced($order));

        return response()->json($order->load('orderItems.menuItem.variants', 'restaurant', 'courier'));
    }

    public function cancelOrder($order_id)
    {
        $user = Auth::user();
        $order = Order::where('user_id', $user->id)->findOrFail($order_id);

        if (in_array($order->status, ['pending', 'accepted', 'preparing'])) {
            $order->update(['status' => 'canceled_user']);
            event(new OrderCanceled($order));
            return response()->json(['message' => 'Order canceled']);
        }

        return response()->json(['message' => 'Cannot cancel this order'], 400);
    }

    public function rateRestaurant(Request $request, $order_id)
    {
        $user = Auth::user();
        $order = Order::where('id', $order_id)->where('user_id', $user->id)->where('status', 'delivered')->firstOrFail();

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

        event(new RestaurantRated($rating));

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
        if ($order->user_id !== $user->id) return response()->json(['message' => 'Unauthorized'], 403);

        $request->validate(['to_address' => 'required|string|max:255']);

        $order->update(['to_address' => $request->to_address]);

        return response()->json($order);
    }

    public function notifications()
    {
        return response()->json(
            Notification::where('user_id', Auth::id())->orderBy('created_at', 'desc')->paginate(10)
        );
    }

    public function getRestaurantById($restaurant_id)
    {
        $restaurant = Restaurant::find($restaurant_id);

        if (!$restaurant) return response()->json(['message' => 'Restaurant not found'], 404);

        return response()->json($restaurant);
    }

    public function ordersHistory()
{
    $user = Auth::user();

    $orders = Order::with(['restaurant', 'orderItems.menuItem.variants', 'courier'])
        ->where('user_id', $user->id)
        ->orderBy('created_at', 'desc')
        ->get();

    return response()->json([
        'orders' => $orders
    ]);
}
}
