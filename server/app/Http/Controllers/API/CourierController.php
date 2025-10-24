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
        $query = Order::whereNull('courier_id')->where('status', 'ready')->with('restaurant');
        return response()->json($query->paginate($request->get('per_page', 15)));
    }

    public function acceptOrder($order_id)
    {
        $order = Order::where('id', $order_id)->whereNull('courier_id')->firstOrFail();
        $order->update(['courier_id' => Auth::id(), 'status' => 'picked_up']);
        SendNotification::dispatch($order, 'user', 'Your order has been picked up');
        return response()->json($order->load('user', 'restaurant'));
    }

    public function completeDelivery($order_id)
    {
        $order = Order::where('courier_id', Auth::id())->findOrFail($order_id);
        $order->update(['status' => 'delivered']);
        SendNotification::dispatch($order, 'user', 'Your order has been delivered');
        return response()->json(['message' => 'Delivery completed']);
    }

    public function deliveriesHistory(Request $request)
    {
        $query = Order::where('courier_id', Auth::id())->with(['user', 'restaurant'])->latest();
        return response()->json($query->paginate($request->get('per_page', 15)));
    }

    public function notifications(Request $request)
    {
        $query = Notification::where('courier_id', Auth::id())->latest();
        return response()->json($query->paginate($request->get('per_page', 15)));
    }
}
