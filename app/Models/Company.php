<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;  // Asegúrate de importar esta clase
use Illuminate\Database\Eloquent\Model;

class Company extends Authenticatable  // Aquí estás implementando Authenticatable
{
    use HasFactory;

    // Asegúrate de que 'email' y 'password' estén incluidos en $fillable
    protected $fillable = ['name', 'email', 'password'];  // Añadido 'password'

    // Relación con usuarios
    public function users()
    {
        return $this->hasMany(User::class);
    }
}
