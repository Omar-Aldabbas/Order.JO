<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('restaurant_ratings', function (Blueprint $table) {
            $table->foreignId('user_id')->constrained()->onDelete('cascade')->after('id');
            $table->foreignId('restaurant_id')->constrained()->onDelete('cascade')->after('user_id');
            $table->tinyInteger('rating')->default(5)->after('restaurant_id');
            $table->text('comment')->nullable()->after('rating');
        });
    }

    public function down(): void
    {
        Schema::table('restaurant_ratings', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropForeign(['restaurant_id']);
            $table->dropColumn(['user_id', 'restaurant_id', 'rating', 'comment']);
        });
    }
};
