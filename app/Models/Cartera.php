<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cartera extends Model
{
    use HasFactory;
    use HasUlids;

    public function cliente() {
        return $this->belongsTo(Cliente::class);
    }

    public function transacciones() {
        return $this->hasMany(Transaccion::class);
    }
}
