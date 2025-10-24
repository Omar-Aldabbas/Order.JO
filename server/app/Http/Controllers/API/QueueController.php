<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Jobs\SendNotificationJob;
use App\Models\User;
use App\Models\Order;

class QueueController extends Controller
{
    public function testNotification(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'message' => 'required|string',
        ]);

        $user = User::find($request->user_id);

        dispatch(new SendNotificationJob($user, $request->message));

        return response()->json(['message' => 'Notification queued successfully']);
    }

    public function testOrderUpdate(Request $request)
    {
        $request->validate([
            'order_id' => 'required|exists:orders,id',
            'status' => 'required|string|in:pending,accepted,preparing,delivering,completed,canceled',
        ]);

        $order = Order::find($request->order_id);

        dispatch(function () use ($order, $request) {
            sleep(2);
            $order->update(['status' => $request->status]);
        });

        return response()->json(['message' => 'Order update queued']);
    }
}
//this just a manula simulation to test queue