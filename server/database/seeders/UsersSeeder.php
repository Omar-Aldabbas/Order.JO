<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{

    public function run(): void
{for ($i = 1; $i <= 5; $i++) {
    User::updateOrCreate(
        ['email' => "owner$i@example.com"],
        [
            'name' => "Restaurant Owner $i",
            'password' => Hash::make('password123'),
            'phone' => '123-456-789' . $i,
            'address' => "123 Street $i, City",
        ]
    );
}

User::updateOrCreate(
    ['email' => 'test@example.com'],
    [
        'name' => 'Test User',
        'password' => Hash::make('password123'),
    ]
);}

}
