<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Carrito extends Model
{
    use HasFactory;
    use HasUlids;

    public function cliente() {
        return $this->belongsTo(Cliente::class);
    }

    public function productos(): BelongsToMany {
        return $this->belongsToMany(Producto::class)
            ->withPivot(['cantidad'])
            ->withTimestamps();
    }
}
