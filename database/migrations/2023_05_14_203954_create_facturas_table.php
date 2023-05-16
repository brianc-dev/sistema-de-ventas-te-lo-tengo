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
        Schema::create('facturas', function (Blueprint $table) {
            $table->ulid('id');
            $table->integer('numero')->autoIncrement();
            $table->integer('pedido_id');
            $table->decimal('total', 19, 4);
            $table->decimal('IVA', 19, 4);
            $table->decimal('imponible', 19, 4);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('facturas');
    }
};
