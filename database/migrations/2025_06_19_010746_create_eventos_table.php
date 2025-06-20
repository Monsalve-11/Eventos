<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id(); // ID del evento
            $table->string('title'); // Título del evento
            $table->text('description')->nullable(); // Descripción del evento
            $table->date('event_date'); // Fecha del evento
            $table->time('start_time'); // Hora de inicio
            $table->time('end_time'); // Hora de finalización
           $table->foreignId('camara_comercio_id') // Relación con la tabla camara_comercios
               ->constrained('camara_comercios') // Esto asegura que 'camara_comercio_id' sea una clave foránea
              ->onDelete('cascade'); // Si se elimina una cámara de comercio, también se eliminarán sus eventos
            $table->timestamps(); // Timestamps para created_at y updated_at
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('events'); // Eliminar la tabla 'events'
    }
};
