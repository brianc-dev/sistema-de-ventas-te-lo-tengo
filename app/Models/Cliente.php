<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    use HasFactory;
    use HasUlids;

    protected $guarded = [];

    protected static function boot() {
        parent::boot();

        static::created(function (Cliente $cliente) {
            // create carrito for cliente
            $cliente->carrito()->create();
            // create cartera for cliente
            $cliente->cartera()->create();
        });
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

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
