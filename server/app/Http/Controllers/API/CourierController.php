<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Notification;
use Illuminate\Support\Facades\Auth;
use App\Jobs\SendNotification;

class CourierController extends Controller
{
    public function availableOrders(Request $request)
    {
        $courier = Auth::user();
        $query = Order::whereNull('courier_id')
            ->where('status', 'ready')
            ->with('restaurant');

        if ($request->filled(['latitude', 'longitude', 'radius'])) {
            $lat = $request->latitude;
            $lng = $request->longitude;
            $radius = $request->radius;

            $query->whereHas('restaurant', function ($q) use ($lat, $lng, $radius) {
                $q->selectRaw("*, ( 6371 * acos( cos( radians(?) ) * cos( radians(latitude) ) * cos( radians(longitude) - radians(?) ) + sin( radians(?) ) * sin( radians(latitude) ) ) ) AS distance", [$lat, $lng, $lat])
                  ->having('distance', '<=', $radius);
            });
        }

        return response()->json($query->paginate($request->get('per_page', 15)));
    }

    public function acceptOrder($order_id)
    {
        $courier = Auth::user();
        $order = Order::where('id', $order_id)->whereNull('courier_id')->firstOrFail();
        $order->update([
            'courier_id' => $courier->id,
            'status' => 'picked_up'
        ]);

        SendNotification::dispatch($order, 'user', 'Your order has been picked up');

        return response()->json($order->load('user', 'restaurant'));
    }

    public function completeDelivery($order_id)
    {
        $courier = Auth::user();
        $order = Order::where('courier_id', $courier->id)->findOrFail($order_id);
        $order->update(['status' => 'delivered']);

        SendNotification::dispatch($order, 'user', 'Your order has been delivered');

        return response()->json(['message' => 'Delivery completed', 'order' => $order]);
    }

    public function deliveriesHistory(Request $request)
    {
        $courier = Auth::user();
        $query = Order::where('courier_id', $courier->id)
            ->with(['user', 'restaurant'])
            ->latest();

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('from_date')) {
            $query->whereDate('created_at', '>=', $request->from_date);
        }

        if ($request->filled('to_date')) {
            $query->whereDate('created_at', '<=', $request->to_date);
        }

        return response()->json($query->paginate($request->get('per_page', 15)));
    }

    public function notifications(Request $request)
    {
        $courier = Auth::user();
        $query = Notification::where('courier_id', $courier->id)->latest();
        return response()->json($query->paginate($request->get('per_page', 15)));
    }
}
