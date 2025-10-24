<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Reservation;
use App\Models\MenuItem;
use App\Models\MenuItemVariant;
use App\Models\Notification;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Jobs\SendNotification;

class RestaurantController extends Controller
{
    public function dashboard(Request $request)
    {
        $restaurant = Auth::user()->restaurant;

        $ordersQuery = Order::with(['user', 'courier', 'orderItems'])
            ->where('restaurant_id', $restaurant->id)
            ->latest();

        $reservationsQuery = Reservation::with('user')
            ->where('restaurant_id', $restaurant->id)
            ->latest();

        if ($request->filled('status')) {
            $ordersQuery->where('status', $request->status);
            $reservationsQuery->where('status', $request->status);
        }

        $orders = $ordersQuery->paginate($request->get('per_page', 15));
        $reservations = $reservationsQuery->paginate($request->get('per_page', 15));

        return response()->json([
            'orders' => $orders,
            'reservations' => $reservations
        ]);
    }

    public function updateOrderStatus(Request $request, $order_id)
    {
        $restaurant = Auth::user()->restaurant;
        $request->validate([
            'status' => 'required|string',
            'note' => 'nullable|string|max:1000'
        ]);

        $order = Order::where('restaurant_id', $restaurant->id)->findOrFail($order_id);
        $order->status = $request->status;
        if ($request->filled('note')) $order->note = $request->note;
        $order->save();

        SendNotification::dispatch($order, 'user', "Your order is now {$order->status}");

        return response()->json($order);
    }

    public function addMenuItem(Request $request)
    {
        $restaurant = Auth::user()->restaurant;

        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'nullable|numeric',
            'description' => 'nullable|string',
            'type' => 'nullable|string',
            'has_variants' => 'nullable|boolean',
            'image' => 'nullable|image|max:2048',
            'variants' => 'nullable|array'
        ]);

        $path = $request->hasFile('image') ? $request->file('image')->store('menu', 'public') : null;

        $item = MenuItem::create([
            'restaurant_id' => $restaurant->id,
            'name' => $request->name,
            'price' => $request->price ?? 0,
            'description' => $request->description,
            'type' => $request->type,
            'image' => $path,
            'has_variants' => $request->has_variants ?? false,
        ]);

        if ($request->filled('variants')) {
            foreach ($request->variants as $variant) {
                $request->validate([
                    'variants.*.name' => 'required|string|max:255',
                    'variants.*.price' => 'required|numeric'
                ]);
                MenuItemVariant::create([
                    'menu_item_id' => $item->id,
                    'name' => $variant['name'],
                    'price' => $variant['price']
                ]);
            }
        }

        return response()->json($item->load('variants'));
    }

    public function deleteMenuItem($id)
    {
        $restaurant = Auth::user()->restaurant;
        $item = MenuItem::where('restaurant_id', $restaurant->id)->findOrFail($id);

        if ($item->image) Storage::disk('public')->delete($item->image);

        $item->variants()->delete();
        $item->delete();

        return response()->json(['message' => 'Item and its variants deleted']);
    }

    public function getMenu(Request $request)
    {
        $restaurant = Auth::user()->restaurant;
        $query = MenuItem::where('restaurant_id', $restaurant->id)->with('variants');

        if ($request->filled('type')) $query->where('type', $request->type);
        if ($request->filled('search')) $query->where('name', 'like', '%' . $request->search . '%');

        return response()->json($query->paginate($request->get('per_page', 15)));
    }

    public function notifications(Request $request)
    {
        $restaurant_id = Auth::user()->restaurant->id;
        $query = Notification::where('restaurant_id', $restaurant_id)->latest();

        return response()->json($query->paginate($request->get('per_page', 15)));
    }
}
