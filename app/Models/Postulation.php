<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Postulation extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'event_id',
         'response',
    ];

    // Relación con el modelo de User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relación con el modelo de Evento
    public function event()
    {
        return $this->belongsTo(Evento::class);
    }
}
