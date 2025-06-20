<?php

// database/seeders/EventSeeder.php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Event;

class EventSeeder extends Seeder
{
    /**
     * Ejecutar la siembra de la base de datos.
     *
     * @return void
     */
    public function run()
    {
        Event::create([
            'title' => 'Evento 1',
            'description' => 'Descripción del evento 1',
            'event_date' => '2025-07-01',
            'start_time' => '10:00:00',
            'end_time' => '12:00:00',
            'camara_comercio_id' => 1,  // Asume que el ID de la cámara de comercio es 1
        ]);

        Event::create([
            'title' => 'Evento 2',
            'description' => 'Descripción del evento 2',
            'event_date' => '2025-08-01',
            'start_time' => '14:00:00',
            'end_time' => '16:00:00',
            'camara_comercio_id' => 1,
        ]);

        Event::create([
            'title' => 'Evento 3',
            'description' => 'Descripción del evento 3',
            'event_date' => '2025-09-01',
            'start_time' => '09:00:00',
            'end_time' => '11:00:00',
            'camara_comercio_id' => 1,
        ]);
    }
}
