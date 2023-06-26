<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class Administrador extends Model
{
    use HasFactory;
    use HasUlids;

    protected $fillable = ['user_id'];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
