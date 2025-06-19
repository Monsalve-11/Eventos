<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable; // si vas a usar Auth
use Illuminate\Notifications\Notifiable;

class Camara_comercio extends Authenticatable
{
    use HasFactory, Notifiable;

    // **Le decimos la tabla exacta**
    protected $table = 'camara_comercio';

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

  
}
