<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Crear la tabla de sesiones para la cámara de comercio
        Schema::create('camara_comercio_sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('camara_comercio_id')->nullable()->index(); // Relacionar con camara_comercio
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('camara_comercio_sessions');
    }
};
