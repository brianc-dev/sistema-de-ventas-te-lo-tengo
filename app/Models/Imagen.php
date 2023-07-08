<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Imagen extends Model
{
    use HasFactory;
    use HasUlids;

    protected $fillable = [
        'producto_id', 'name'
    ];

    public function producto(): BelongsTo {
        return $this->belongsTo(Producto::class);
    }
}
