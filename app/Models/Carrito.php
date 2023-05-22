<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Carrito extends Model
{
    use HasFactory;
    use HasUlids;
    
    public function cliente() {
        return $this->belongsTo(Cliente::class);
    }

    public function productos() {
        return $this->belongsToMany(Producto::class);
    }
}
