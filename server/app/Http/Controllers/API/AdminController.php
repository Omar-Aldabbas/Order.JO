<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Order;
use App\Models\Restaurant;
use App\Models\Reservation;
use App\Models\Notification;

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

    public function users()
    {
        return response()->json(User::with('roles')->get());
    }

    public function orders()
    {
        return response()->json(Order::with(['user', 'restaurant', 'courier'])->latest()->get());
    }

    public function reservations()
    {
        return response()->json(Reservation::with(['user', 'restaurant'])->latest()->get());
    }

    public function deleteUser($id)
    {
        $u = User::findOrFail($id);
        $u->delete();
        return response()->json(['message' => 'User deleted']);
    }

    public function notifications()
    {
        return response()->json(Notification::latest()->get());
    }
}
