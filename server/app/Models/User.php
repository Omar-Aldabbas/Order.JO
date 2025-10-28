<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'profile_image',
        'latitude',
        'longitude',
        'phone',
        'birth_date',
        'address',
        'avatar',
        'role',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function restaurant()
    {
        return $this->hasOne(Restaurant::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }

    public function deliveries()
    {
        return $this->hasMany(Order::class, 'courier_id');
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }

    public function ratedRestaurants()
    {
        return $this->hasMany(RestaurantRating::class);
    }

    public function cartItems()
    {
        return $this->hasMany(CartItem::class);
    }

    public function roleChangeRequests()
    {
        return $this->hasMany(RoleChangeRequest::class, 'user_id');
    }

    public function handledRoleChangeRequests()
    {
        return $this->hasMany(RoleChangeRequest::class, 'handled_by');
    }

    public function hasRole($role)
    {
        return $this->role === $role;
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}
