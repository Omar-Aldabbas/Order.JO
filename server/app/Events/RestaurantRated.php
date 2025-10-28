<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Models\RestaurantRating;

class RestaurantRated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $rating;

    public function __construct(RestaurantRating $rating)
    {
        $this->rating = $rating;
    }

    public function broadcastOn()
    {
        return new Channel('restaurant-' . $this->rating->restaurant_id);
    }

    public function broadcastWith()
    {
        return [
            'order_id' => $this->rating->order_id,
            'user_id' => $this->rating->user_id,
            'restaurant_id' => $this->rating->restaurant_id,
            'rating' => $this->rating->rating,
            'review' => $this->rating->review,
        ];
    }
}
