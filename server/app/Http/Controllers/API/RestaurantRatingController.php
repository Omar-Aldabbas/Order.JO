<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\RestaurantRating;
use App\Models\Order;
use App\Jobs\SendNotification;
use Illuminate\Support\Facades\Auth;

class RestaurantRatingController extends Controller
{
    public function rate(Request $request, $order_id)
    {
        $user = Auth::user();
        $order = Order::where('id', $order_id)
            ->where('user_id', $user->id)
            ->whereIn('status', ['delivered', 'picked_up'])
            ->firstOrFail();

        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'review' => 'nullable|string|max:1000',
        ]);

        $rating = RestaurantRating::updateOrCreate(
            ['order_id' => $order->id],
            [
                'user_id' => $user->id,
                'restaurant_id' => $order->restaurant_id,
                'rating' => $request->rating,
                'review' => $request->review,
            ]
        );

        SendNotification::dispatch($rating, 'restaurant', 'You received a new rating');

        return response()->json($rating);
    }

    public function getRestaurantRatings(Request $request, $restaurant_id)
    {
        $query = RestaurantRating::where('restaurant_id', $restaurant_id)->with('user')->orderBy('created_at', 'desc');

        if ($request->filled('min_rating')) $query->where('rating', '>=', $request->min_rating);
        if ($request->filled('max_rating')) $query->where('rating', '<=', $request->max_rating);
        if ($request->filled('from_date')) $query->whereDate('created_at', '>=', $request->from_date);
        if ($request->filled('to_date')) $query->whereDate('created_at', '<=', $request->to_date);

        $ratings = $query->paginate(10);
        $average = $ratings->avg('rating');

        return response()->json([
            'average_rating' => round($average, 1),
            'ratings' => $ratings
        ]);
    }
}
