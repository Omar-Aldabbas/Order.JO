<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Restaurant;
use App\Models\MenuItem;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Reservation;
use App\Models\Notification;
use App\Models\RestaurantRating;
use Illuminate\Support\Facades\Auth;
use App\Jobs\SendNotification;

class UserController extends Controller
{
    public function getRestaurants(Request $request)
    {
        $query = Restaurant::query();
        if ($request->has('type')) $query->where('type', $request->type);
        return response()->json($query->with('menuItems')->get());
    }

    public function getMenu(Request $request, $restaurant_id)
    {
        $query = MenuItem::where('restaurant_id', $restaurant_id);

        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        return response()->json($query->get());
    }
    public function updateProfile(Request $request)
    {
        $user = Auth::user();
        $request->validate([
            'name' => 'sometimes|string|max:255',
            'profile_image' => 'sometimes|image|max:2048',
            'latitude' => 'sometimes|numeric',
            'longitude' => 'sometimes|numeric',
        ]);
        if ($request->hasFile('profile_image')) $user->profile_image = $request->file('profile_image')->store('profile_images', 'public');
        if ($request->has('name')) $user->name = $request->name;
        if ($request->has('latitude')) $user->latitude = $request->latitude;
        if ($request->has('longitude')) $user->longitude = $request->longitude;
        $user->save();
        return response()->json($user);
    }

    public function placeOrder(Request $request)
    {
        $user = Auth::user();
        $request->validate([
            'restaurant_id' => 'required|exists:restaurants,id',
            'items' => 'required|array',
            'items.*.menu_item_id' => 'required|exists:menu_items,id',
            'items.*.quantity' => 'required|integer|min:1'
        ]);
        $total = 0;
        foreach ($request->items as $item) $total += MenuItem::find($item['menu_item_id'])->price * $item['quantity'];
        $order = Order::create([
            'user_id' => $user->id,
            'restaurant_id' => $request->restaurant_id,
            'status' => 'pending',
            'total_price' => $total
        ]);
        foreach ($request->items as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'menu_item_id' => $item['menu_item_id'],
                'quantity' => $item['quantity'],
                'price' => MenuItem::find($item['menu_item_id'])->price
            ]);
        }
        SendNotification::dispatch($order, 'restaurant', 'New order received');
        return response()->json($order->load('orderItems', 'courier'));
    }

    public function cancelOrder($order_id)
    {
        $user = Auth::user();
        $order = Order::where('user_id', $user->id)->findOrFail($order_id);
        if (in_array($order->status, ['pending', 'accepted', 'preparing'])) {
            $order->status = 'canceled_by_user';
            $order->save();
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
            $reservation->status = 'canceled_by_user';
            $reservation->save();
            SendNotification::dispatch($reservation, 'restaurant', 'Reservation canceled by user');
            return response()->json(['message' => 'Reservation canceled']);
        }
        return response()->json(['message' => 'Cannot cancel this reservation'], 400);
    }

    public function rateRestaurant(Request $request, $order_id)
    {
        $user = Auth::user();
        $order = Order::where('id', $order_id)->where('user_id', $user->id)->where('status', 'delivered')->firstOrFail();
        $request->validate(['rating' => 'required|integer|min:1|max:5', 'review' => 'nullable|string|max:1000']);
        $rating = RestaurantRating::updateOrCreate(
            ['order_id' => $order->id],
            ['user_id' => $user->id, 'restaurant_id' => $order->restaurant_id, 'rating' => $request->rating, 'review' => $request->review]
        );
        return response()->json($rating);
    }

    public function notifications()
    {
        return response()->json(Notification::where('user_id', Auth::id())->orderBy('created_at','desc')->get());
    }

    public function ordersHistory()
    {
        $user = Auth::user();
        $orders = Order::where('user_id', $user->id)
            ->with(['orderItems.menuItem', 'restaurant', 'courier'])
            ->orderBy('created_at', 'desc')
            ->get();
        return response()->json($orders);
    }
    
}
