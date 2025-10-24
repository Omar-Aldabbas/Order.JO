<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\RestaurantRating;
use App\Models\Order;
use App\Models\Notification;
use Illuminate\Support\Facades\Auth;
use App\Jobs\SendNotification;

class RestaurantRatingController extends Controller
{
    public function rate(Request $request, $order_id)
    {
        $user = Auth::user();
        $order = Order::where('id', $order_id)
            ->where('user_id', $user->id)
            ->where('status', 'delivered')
            ->firstOrFail();

        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'review' => 'nullable|string|max:1000'
        ]);

        $rating = RestaurantRating::updateOrCreate(
            ['order_id' => $order->id],
            [
                'user_id' => $user->id,
                'restaurant_id' => $order->restaurant_id,
                'rating' => $request->rating,
                'review' => $request->review
            ]
        );

        $message = 'You received a new rating';
        SendNotification::dispatch($rating, 'restaurant', $message);

        return response()->json($rating);
    }

    public function getRestaurantRatings($restaurant_id)
    {
        $ratings = RestaurantRating::where('restaurant_id', $restaurant_id)
            ->with('user')
            ->orderBy('created_at', 'desc')
            ->get();

        $average = $ratings->avg('rating');

        return response()->json([
            'average_rating' => round($average, 1),
            'ratings' => $ratings
        ]);
    }
}
