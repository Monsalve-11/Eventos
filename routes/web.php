<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventoController;
use Inertia\Inertia;

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


use App\Http\Controllers\UserController;
/*
Route::get('/users', [UserController::class, 'index'])->name('users.index');
Route::post('/users/{userId}/assign-role', [UserController::class, 'assignRole'])->name('users.assignRole');
Route::post('/users/{userId}/remove-role', [UserController::class, 'removeRole'])->name('users.removeRole');
*/

use App\Http\Controllers\RoleController;

Route::get('/users', [UserController::class, 'index']); // Lista de usuarios
Route::get('/roles', [RoleController::class, 'index']); // Lista de roles

Route::post('/users/{userId}/assign-role', [UserController::class, 'assignRole']);
Route::post('/users/{userId}/remove-role', [UserController::class, 'removeRole']);


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
