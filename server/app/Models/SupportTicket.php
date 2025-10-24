<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Order;
use App\Models\Reservation;

class SupportTicket extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'type',
        'related_id',
        'message',
        'status',
        'resolution_message',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function order()
    {
        return $this->belongsTo(Order::class, 'related_id')->where('type', 'order');
    }

    public function reservation()
    {
        return $this->belongsTo(Reservation::class, 'related_id')->where('type', 'reservation');
    }
}
