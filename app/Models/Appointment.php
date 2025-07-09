<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'company_id',
        'event_id',
        'date',
        'start_time',
        'end_time',
    ];

    // Relación con el modelo de User (persona natural)
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // Relación con el modelo de User (empresa)
    public function company()
    {
        return $this->belongsTo(User::class, 'company_id');
    }

    // Relación con el modelo de Evento
    public function event()
    {
        return $this->belongsTo(Evento::class, 'event_id');
    }
}
