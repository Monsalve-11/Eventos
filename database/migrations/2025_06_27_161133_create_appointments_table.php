<?php


use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAppointmentsTable extends Migration
{
    public function up()
    {
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');  // Referencia al usuario que hace la cita
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');  // Referencia a la empresa, que es un usuario con rol 'empresa'
            $table->foreignId('event_id')->constrained('eventos')->onDelete('cascade');  // Referencia al evento
            $table->date('date');  // Fecha de la cita
            $table->time('start_time');  // Hora de inicio
            $table->time('end_time');  // Hora de fin
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('appointments');
    }
}
