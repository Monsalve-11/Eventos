<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    // Campos que se pueden asignar masivamente
    protected $fillable = [
        'title',
        'description',
        'event_date',
        'event_start_time',
        'event_end_time',
        'company_id', // Relación con la empresa principal
    ];

    /**
     * Relación muchos a muchos con la tabla 'companies'
     */
    public function companies()
    {
        return $this->belongsToMany(Company::class, 'company_event');
    }
}
