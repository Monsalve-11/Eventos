<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 
        'description', 
        'event_date', 
        'start_time', 
        'end_time', 
        'camara_comercio_id'
    ];

    // Relación con Camara_comercio
    public function camara_comercio()
    {
        return $this->belongsTo(Camara_comercio::class);
    }
}
