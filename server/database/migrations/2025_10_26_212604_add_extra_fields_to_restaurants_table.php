<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddExtraFieldsToRestaurantsTable extends Migration
{
    public function up(): void
    {
        Schema::table('restaurants', function (Blueprint $table) {
            $table->string('cover_image')->nullable()->after('profile_image');
            $table->string('phone')->nullable()->after('cover_image');
            $table->text('bio')->nullable()->after('phone');
            $table->json('operating_hours')->nullable()->after('type'); 
        });
    }

    public function down(): void
    {
        Schema::table('restaurants', function (Blueprint $table) {
            $table->dropColumn(['cover_image', 'phone', 'bio', 'operating_hours']);
        });
    }
}
