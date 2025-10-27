<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Notification;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        $query = Notification::where('user_id', $user->id);

        if ($request->filled('type')) $query->where('type', $request->type);
        if ($request->filled('read')) {
            $read = filter_var($request->read, FILTER_VALIDATE_BOOLEAN);
            if ($read) $query->whereNotNull('read_at');
            else $query->whereNull('read_at');
        }

        $notifications = $query->orderBy('created_at', 'desc')->paginate($request->get('per_page', 15));
        $unread_count = Notification::where('user_id', $user->id)->whereNull('read_at')->count();

        return response()->json([
            'unread_count' => $unread_count,
            'notifications' => $notifications
        ]);
    }

    public function markAsRead($id)
    {
        $user = Auth::user();
        $notification = Notification::where('user_id', $user->id)->findOrFail($id);
        $notification->read_at = now();
        $notification->save();

        return response()->json(['message' => 'Notification marked as read']);
    }

    public function destroy($id)
    {
        $user = Auth::user();
        $notification = Notification::where('user_id', $user->id)->findOrFail($id);
        $notification->delete();

        return response()->json(['message' => 'Notification deleted']);
    }

    public function clearAll()
    {
        $user = Auth::user();
        Notification::where('user_id', $user->id)->delete();

        return response()->json(['message' => 'All notifications cleared']);
    }

    public function markAllAsRead()
    {
        $user = Auth::user();
        Notification::where('user_id', $user->id)->whereNull('read_at')->update(['read_at' => now()]);

        return response()->json(['message' => 'All notifications marked as read']);
    }
}
