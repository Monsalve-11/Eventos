<?php
// database/migrations/2025_06_27_161133_create_appointments_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAppointmentsTable extends Migration
{
    public function up()
    {
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            // Persona natural que solicita la cita
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            // Empresa (también es un usuario) con rol "empresa"
            $table->foreignId('company_id')->constrained('users')->onDelete('cascade');
            // Evento al que se asocia la cita
            $table->foreignId('event_id')->constrained('eventos')->onDelete('cascade');
            $table->date('date');
            $table->time('start_time');
            $table->time('end_time');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('appointments');
    }
}
