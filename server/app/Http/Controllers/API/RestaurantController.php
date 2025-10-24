<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Reservation;
use App\Models\MenuItem;
use App\Models\Notification;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Jobs\SendNotification;

class RestaurantController extends Controller
{
    public function dashboard()
    {
        $restaurant = Auth::user()->restaurant;
        $orders = Order::with(['user', 'courier'])->where('restaurant_id', $restaurant->id)->latest()->get();
        $reservations = Reservation::with('user')->where('restaurant_id', $restaurant->id)->latest()->get();
        return response()->json(['orders' => $orders, 'reservations' => $reservations]);
    }

    public function updateOrderStatus(Request $request, $order_id)
    {
        $restaurant = Auth::user()->restaurant;
        $request->validate(['status' => 'required|string']);
        $order = Order::where('restaurant_id', $restaurant->id)->findOrFail($order_id);
        $order->status = $request->status;
        $order->save();
        SendNotification::dispatch($order, 'user', "Your order is now {$order->status}");
        return response()->json($order);
    }

    public function addMenuItem(Request $request)
    {
        $restaurant = Auth::user()->restaurant;
        $request->validate(['name' => 'required|string', 'price' => 'required|numeric', 'image' => 'nullable|image|max:2048']);
        $path = $request->hasFile('image') ? $request->file('image')->store('menu', 'public') : null;
        $item = MenuItem::create(['restaurant_id' => $restaurant->id, 'name' => $request->name, 'price' => $request->price, 'image' => $path]);
        return response()->json($item);
    }

    public function deleteMenuItem($id)
    {
        $restaurant = Auth::user()->restaurant;
        $item = MenuItem::where('restaurant_id', $restaurant->id)->findOrFail($id);
        if ($item->image) Storage::disk('public')->delete($item->image);
        $item->delete();
        return response()->json(['message' => 'Item deleted']);
    }

    public function notifications()
    {
        return response()->json(Notification::where('restaurant_id', Auth::user()->restaurant->id)->latest()->get());
    }
}
