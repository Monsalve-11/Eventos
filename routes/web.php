<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventoController;
use Inertia\Inertia;
use App\Http\Controllers\UserController;

use App\Http\Controllers\RoleController;
use App\Http\Controllers\PostulationController;
use App\Http\Controllers\ResponsePostulationController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('eventos', EventoController::class);   
    Route::get('/eventos/create', [EventoController::class, 'create'])->name('eventos.create');

});



Route::get('/users', [UserController::class, 'index']); // Lista de usuarios
Route::get('/roles', [RoleController::class, 'index']); // Lista de roles

Route::post('/users/{userId}/assign-role', [UserController::class, 'assignRole']);
Route::post('/users/{userId}/remove-role', [UserController::class, 'removeRole']);


  Route::get('/postulations', [PostulationController::class, 'index'])->name('postulations.index');  // Ver eventos
    Route::post('/postulations/{eventId}', [PostulationController::class, 'store'])->name('postulations.store');  // Postularse
    Route::delete('/postulations/{eventId}', [PostulationController::class, 'destroy'])->name('postulations.destroy');  // Eliminar postulación


// Mostrar las postulaciones divididas en tres secciones
Route::get('/response-postulations', [ResponsePostulationController::class, 'index'])->name('responsePostulations.index');  // Ver todas las postulaciones (pendientes, aceptadas, rechazadas)

// Aceptar una postulación
Route::post('/response-postulations/{postulationId}/accept', [ResponsePostulationController::class, 'accept'])->name('responsePostulations.accept');  // Aceptar postulación

// Rechazar una postulación
Route::post('/response-postulations/{postulationId}/reject', [ResponsePostulationController::class, 'reject'])->name('responsePostulations.reject');  // Rechazar postulación

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
