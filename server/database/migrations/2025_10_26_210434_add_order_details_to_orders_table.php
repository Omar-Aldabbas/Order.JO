<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
    Schema::table('orders', function (Blueprint $table) {
        if (!Schema::hasColumn('orders', 'type')) {
            $table->enum('type', ['pickup','delivery'])->default('delivery')->after('status');
        }
        if (!Schema::hasColumn('orders', 'note')) {
            $table->text('note')->nullable()->after('type');
        }
        if (!Schema::hasColumn('orders', 'from_address')) {
            $table->string('from_address')->nullable()->after('note');
        }
        if (!Schema::hasColumn('orders', 'to_address')) {
            $table->string('to_address')->nullable()->after('from_address');
        }
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn(['type', 'note', 'from_address', 'to_address']);
        });
    }
};
