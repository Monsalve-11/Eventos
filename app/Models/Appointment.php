<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'company_id', 'event_id', 'date', 'start_time', 'end_time'];

    // Relación con el usuario que hace la cita
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relación con la empresa (usuario con rol 'empresa')
    public function company()
    {
        return $this->belongsTo(User::class, 'company_id');
    }

    // Relación con el evento
    public function event()
    {
        return $this->belongsTo(Event::class);
    }
}
