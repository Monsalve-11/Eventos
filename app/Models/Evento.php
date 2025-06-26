<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Evento extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'descripcion', 'fecha_inicio', 'fecha_fin', 'user_id'];

    // Relación con el usuario
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
