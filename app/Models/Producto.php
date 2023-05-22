<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    use HasFactory;

    protected $fillable = [
        'codigo',
        'nombre',
        'cantidad',
        'precio',
        'gravado'
    ];

    public function pedidos() {
        return $this->belongsToMany(Pedido::class);
    }

    public function carritos() {
        return $this->belongsToMany(Carrito::class);
    }
}
