<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SupportTicket;
use App\Models\Order;
use App\Models\Reservation;
use App\Models\Notification;
use Illuminate\Support\Facades\Auth;
use App\Jobs\SendNotification;

class SupportController extends Controller
{
    public function index()
    {
        $tickets = SupportTicket::with(['user', 'order', 'reservation'])
                    ->orderBy('created_at', 'desc')
                    ->get();

        return response()->json($tickets);
    }

    public function store(Request $request)
    {
        $request->validate([
            'type' => 'required|in:order,reservation',
            'related_id' => 'required|integer',
            'message' => 'required|string|max:1000'
        ]);

        $ticket = SupportTicket::create([
            'user_id' => Auth::id(),
            'type' => $request->type,
            'related_id' => $request->related_id,
            'message' => $request->message,
            'status' => 'open'
        ]);

        SendNotification::dispatch($ticket, 'user', 'Your support ticket has been submitted successfully.');

        return response()->json($ticket);
    }

    public function show($id)
    {
        $ticket = SupportTicket::with(['user', 'order', 'reservation'])->findOrFail($id);
        return response()->json($ticket);
    }

    public function resolve(Request $request, $id)
    {
        $ticket = SupportTicket::findOrFail($id);
        $ticket->status = 'resolved';
        $ticket->resolution_message = $request->input('resolution_message', null);
        $ticket->save();

        SendNotification::dispatch($ticket, 'user', 'Your support ticket has been resolved by the support team.');

        return response()->json(['message' => 'Ticket resolved successfully']);
    }

    public function refundOrder($id)
    {
        $ticket = SupportTicket::where('type', 'order')->where('related_id', $id)->firstOrFail();
        $order = Order::findOrFail($id);

        $order->status = 'refunded';
        $order->save();

        $ticket->status = 'resolved';
        $ticket->resolution_message = 'Refund issued for the order.';
        $ticket->save();

        SendNotification::dispatch($order, 'user', 'Your order has been refunded after support review.');

        return response()->json(['message' => 'Order refunded successfully']);
    }

    public function cancelReservation($id)
    {
        $ticket = SupportTicket::where('type', 'reservation')->where('related_id', $id)->firstOrFail();
        $reservation = Reservation::findOrFail($id);

        $reservation->status = 'canceled_by_support';
        $reservation->save();

        $ticket->status = 'resolved';
        $ticket->resolution_message = 'Reservation canceled by support.';
        $ticket->save();

        SendNotification::dispatch($reservation, 'user', 'Your reservation was canceled after support review.');

        return response()->json(['message' => 'Reservation canceled by support']);
    }
}
