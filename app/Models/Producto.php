<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    use HasFactory;
    use HasUlids;

    protected $fillable = [
        'codigo',
        'nombre',
        'cantidad',
        'precio',
        'gravado'
    ];

    protected $hidden = [
        'codigo'
    ];

    public function pedidos() {
        return $this->belongsToMany(Pedido::class);
    }

    public function carritos() {
        return $this->belongsToMany(Carrito::class);
    }

    public function imagenes() {
        return $this->hasMany(Imagen::class);
    }
}
