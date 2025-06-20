<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Camara_comercio extends Authenticatable
{
    use HasFactory, Notifiable;

    // Establecer el nombre de la tabla para que sea 'camara_comercios'
    protected $table = 'camara_comercios';  // Tabla correcta en plural

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];
}
