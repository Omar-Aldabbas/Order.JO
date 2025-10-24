<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MenuItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'restaurant_id',
        'name',
        'description',
        'price',
        'type',
        'image',
        'has_variants'
    ];

    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }

    public function variants()
    {
        return $this->hasMany(MenuItemVariant::class);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}
