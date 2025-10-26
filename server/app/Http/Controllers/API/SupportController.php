<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SupportTicket;
use App\Models\Order;
use App\Models\Reservation;
use App\Models\RoleChangeRequest;
use Illuminate\Support\Facades\Auth;
use App\Jobs\SendNotification;

class SupportController extends Controller
{
    public function index(Request $request)
    {
        $query = SupportTicket::with(['user', 'order', 'reservation', 'roleChangeRequest'])->latest();
        if ($request->filled('status')) $query->where('status', $request->status);
        if ($request->filled('type')) $query->where('type', $request->type);
        if ($request->filled('from_date')) $query->whereDate('created_at', '>=', $request->from_date);
        if ($request->filled('to_date')) $query->whereDate('created_at', '<=', $request->to_date);
        return response()->json($query->paginate(10));
    }

    public function store(Request $request)
    {
        $request->validate([
            'type' => 'required|in:order,reservation,role_change',
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
        $ticket = SupportTicket::with(['user', 'order', 'reservation', 'roleChangeRequest'])->findOrFail($id);
        return response()->json($ticket);
    }

    public function resolve(Request $request, $id)
    {
        $ticket = SupportTicket::findOrFail($id);
        $ticket->update([
            'status' => 'resolved',
            'resolution_message' => $request->input('resolution_message')
        ]);

        if ($ticket->type === 'role_change' && $ticket->roleChangeRequest) {
            $roleRequest = $ticket->roleChangeRequest;
            $roleRequest->update([
                'status' => 'approved',
                'handled_by' => Auth::id(),
                'note' => $request->input('resolution_message')
            ]);
            $roleRequest->user->syncRoles($roleRequest->requested_role);
            SendNotification::dispatch($roleRequest, 'user', 'Your role change request has been approved.');
        }

        SendNotification::dispatch($ticket, 'user', 'Your support ticket has been resolved by the support team.');
        return response()->json(['message' => 'Ticket resolved successfully']);
    }

    public function refundOrder($order_id)
    {
        $ticket = SupportTicket::where('type', 'order')->where('related_id', $order_id)->firstOrFail();
        $order = Order::findOrFail($order_id);
        $order->update(['status' => 'refunded']);
        $ticket->update([
            'status' => 'resolved',
            'resolution_message' => 'Refund issued for the order.'
        ]);
        SendNotification::dispatch($order, 'user', 'Your order has been refunded after support review.');
        return response()->json(['message' => 'Order refunded successfully']);
    }

    public function cancelReservation($reservation_id)
    {
        $ticket = SupportTicket::where('type', 'reservation')->where('related_id', $reservation_id)->firstOrFail();
        $reservation = Reservation::findOrFail($reservation_id);
        $reservation->update(['status' => 'canceled_by_support']);
        $ticket->update([
            'status' => 'resolved',
            'resolution_message' => 'Reservation canceled by support.'
        ]);
        SendNotification::dispatch($reservation, 'user', 'Your reservation was canceled after support review.');
        return response()->json(['message' => 'Reservation canceled by support']);
    }
}
