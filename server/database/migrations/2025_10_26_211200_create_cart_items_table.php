<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCartItemsTable extends Migration
{
    public function up(): void
    {
        Schema::create('cart_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('menu_item_id')->constrained()->onDelete('cascade');
            $table->foreignId('menu_item_variant_id')->nullable()->constrained('menu_item_variants')->onDelete('set null');
            $table->integer('quantity')->default(1);
            $table->decimal('price', 8, 2)->nullable();
            $table->timestamps();
            $table->unique(['user_id', 'menu_item_id', 'menu_item_variant_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cart_items');
    }
}
