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
        Schema::create('categoria_producto', function (Blueprint $table) {
            $table->foreignId('categoria_id');
            $table->foreignUlid('producto_id');
            $table->timestamps();
            $table->primary(['categoria_id', 'producto_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categoria_producto');
    }
};
