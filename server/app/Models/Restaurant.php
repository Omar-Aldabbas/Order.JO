<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Restaurant extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'type',
        'address',
        'latitude',
        'longitude',
        'profile_image',
        'cover_image',
        'phone',
        'bio',
        'service_type',
        'operating_hours',
    ];

    protected $casts = [
        'operating_hours' => 'array',
    ];

    public function owner()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function menuItems()
    {
        return $this->hasMany(MenuItem::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
    public function ratings()
    {
        return $this->hasMany(RestaurantRating::class);
    }
}
