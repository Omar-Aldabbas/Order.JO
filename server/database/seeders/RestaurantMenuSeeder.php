<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Restaurant;
use App\Models\MenuItem;
use App\Models\MenuItemVariant;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class RestaurantMenuSeeder extends Seeder
{
    public function run(): void
    {
        // Create restaurant owners
        $users = User::factory()->count(5)->create();

        foreach ($users as $userIndex => $user) {
            // Create a restaurant for each user
            $restaurant = Restaurant::create([
                'user_id' => $user->id,
                'name' => "Restaurant " . ($userIndex + 1),
                'type' => ['fast_food', 'western', 'desserts', 'asian'][array_rand(['fast_food', 'western', 'desserts', 'asian'])],
                'service_type' => 'both',
                'address' => "123 Street " . ($userIndex + 1),
                'phone' => "123-456-78" . ($userIndex + 1) . ($userIndex + 1),
                'bio' => "Delicious food at Restaurant " . ($userIndex + 1),
                'profile_image' => "https://source.unsplash.com/400x300/?restaurant,food&sig=" . ($userIndex + 1),
                'cover_image' => "https://source.unsplash.com/800x400/?restaurant,food&sig=" . ($userIndex + 1),
            ]);

            // Create menu items for this restaurant
            foreach (range(1, 8) as $i) {
                $menuItem = MenuItem::create([
                    'restaurant_id' => $restaurant->id,
                    'name' => "Food Item $i",
                    'description' => "Tasty and fresh food item $i",
                    'price' => rand(5, 50),
                    'type' => ['burger', 'pizza', 'shawarma', 'salad', 'soup'][array_rand(['burger', 'pizza', 'shawarma', 'salad', 'soup'])],
                    'image' => "https://source.unsplash.com/400x300/?food&sig=$i",
                    'has_variants' => rand(0, 1),
                ]);

                // Create variants if has_variants is true
                if ($menuItem->has_variants) {
                    foreach (range(1, 3) as $v) {
                        MenuItemVariant::create([
                            'menu_item_id' => $menuItem->id,
                            'name' => $menuItem->name . " Variant $v",
                            'price' => $menuItem->price + rand(1, 5),
                        ]);
                    }
                }
            }
        }
    }
}
