<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class Administrador extends User
{
    use HasFactory;
    use HasUlids;

    protected $guarded = [];

    protected static function boot() {
        parent::boot();

        static::created(function (Administrador $administrador) {
            
        }); 
    }

    public function user() {
        return $this->belongsTo(User::class);
    }
}
