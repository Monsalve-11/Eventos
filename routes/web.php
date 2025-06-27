<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventoController;
use Inertia\Inertia;
use App\Http\Controllers\UserController;

use App\Http\Controllers\RoleController;
use App\Http\Controllers\PostulationController;
use App\Http\Controllers\ResponsePostulationController;
use App\Http\Controllers\AppointmentController;
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

// Ruta para postularse
  Route::get('/postulations', [PostulationController::class, 'index'])->name('postulations.index');  // Ver eventos
    Route::post('/postulations/{eventId}', [PostulationController::class, 'store'])->name('postulations.store');  // Postularse
    Route::delete('/postulations/{eventId}', [PostulationController::class, 'destroy'])->name('postulations.destroy');  // Eliminar postulación


// Ruta para ver todas las postulaciones
Route::get('/response-postulations', [ResponsePostulationController::class, 'index'])->name('responsePostulations.index');
Route::post('/response-postulations/{postulationId}/accept', [ResponsePostulationController::class, 'accept'])->name('responsePostulations.accept');
Route::post('/response-postulations/{postulationId}/reject', [ResponsePostulationController::class, 'reject'])->name('responsePostulations.reject');


// Mostrar la vista de citas disponibles
// Mostrar los eventos y citas
Route::get('/appointments', [AppointmentController::class, 'index'])->name('appointments.index');
Route::post('/appointments', [AppointmentController::class, 'store'])->name('appointments.store');
Route::get('/appointments/{id}', [AppointmentController::class, 'show'])->name('appointments.show');
Route::get('/get-users-for-event/{eventId}', [AppointmentController::class, 'getUsersForEvent']);

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
