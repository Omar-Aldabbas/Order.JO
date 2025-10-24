<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Order;
use App\Models\Restaurant;
use App\Models\Reservation;
use App\Models\Notification;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function dashboard()
    {
        return response()->json([
            'users' => User::count(),
            'restaurants' => Restaurant::count(),
            'orders' => Order::count(),
            'reservations' => Reservation::count(),
        ]);
    }

    public function users(Request $request)
    {
        $query = User::with('roles');

        if ($request->has('role')) {
            $query->whereHas('roles', fn($q) => $q->where('name', $request->role));
        }

        return response()->json($query->paginate($request->get('per_page', 15)));
    }

    public function orders(Request $request)
    {
        $query = Order::with(['user', 'restaurant', 'courier']);

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('restaurant_id')) {
            $query->where('restaurant_id', $request->restaurant_id);
        }

        return response()->json($query->latest()->paginate($request->get('per_page', 15)));
    }

    public function reservations(Request $request)
    {
        $query = Reservation::with(['user', 'restaurant']);

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('restaurant_id')) {
            $query->where('restaurant_id', $request->restaurant_id);
        }

        return response()->json($query->latest()->paginate($request->get('per_page', 15)));
    }

    public function deleteUser($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(['message' => 'User deleted']);
    }

    public function notifications(Request $request)
    {
        $query = Notification::query();

        if ($request->has('user_id')) {
            $query->where('user_id', $request->user_id);
        }

        return response()->json($query->latest()->paginate($request->get('per_page', 15)));
    }
}
