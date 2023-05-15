<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends User
{
    use HasFactory;

    protected $guarded = [];

    public function cartera() {
        return $this->hasOne(Cartera::class);
    }

    public function pedidos() {
        return $this->hasMany(Pedido::class);
    }

    public function carrito() {
        return $this->hasOne(Carrito::class);
    }
}
