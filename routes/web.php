<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\GeneralInfoController;
use App\Http\Controllers\CitaController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\HistorialController;
use App\Http\Controllers\StatisticController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PasswordController;
use App\Http\Controllers\AppearanceController;
use App\Http\Controllers\CompanyDashboardController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Camara_comercioDashboardController;

// Importar controladores específicos de Camara de Comercio y Empresa
use App\Http\Controllers\Auth\camara_comercio\RegisteredController as camara_comercioRegister;
use App\Http\Controllers\Auth\camara_comercio\LoginController as camara_comercioLogin;
use App\Http\Controllers\Auth\Company\RegisteredController as CompanyRegister;
use App\Http\Controllers\Auth\Company\LoginController as CompanyLogin;
use App\Http\Controllers\EventCamaraComercioController;

// Rutas para usuarios normales (Autenticados)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
Route::get('events', function () {
        return Inertia::render('events');
    })->name('events');

      Route::get('events', [UsertController::class, 'index'])->name('events');
    Route::get('/user/events/{eventId}', [UserController::class, 'show'])->name('user.eventDetails'); // Ver detalles de evento

     Route::get('/user/events', [UserEventController::class, 'index'])->name('user.events');

    // Ruta para ver los detalles de un evento
    Route::get('/user/events/{eventId}', [UserEventController::class, 'show'])->name('user.eventDetails');
});

// Rutas de la empresa (Company)
Route::prefix('company')->name('company.')->group(function(){
    // Rutas para empresas no autenticadas (guest)
    Route::middleware('guest:company')->group(function(){
        Route::get('login', [CompanyLogin::class, 'showLoginForm'])->name('login');
        Route::post('login', [CompanyLogin::class, 'login']);
        Route::get('register', [CompanyRegister::class, 'showRegistrationForm'])->name('register');
        Route::post('register', [CompanyRegister::class, 'register']);
        Route::get('dashboard', [CompanyDashboardController::class, 'index'])->name('dashboard');
        Route::post('logout', [CompanyLogin::class, 'logout'])->name('logout');
    });

    // Rutas para empresas autenticadas
    Route::middleware('auth:company')->group(function(){
        Route::get('dashboard', [CompanyDashboardController::class, 'index'])->name('dashboard');
        Route::post('logout', [CompanyLogin::class, 'logout'])->name('logout');
    });
});

// Rutas para la cámara de comercio (Camara Comercio)
Route::prefix('camara_comercio')->name('camara_comercio.')->group(function () {
    // Rutas para cámara de comercio no autenticada (guest)
    Route::middleware('guest:camara_comercio')->group(function () {
        Route::get('login', [camara_comercioLogin::class, 'showLoginForm'])->name('login');
        Route::post('login', [camara_comercioLogin::class, 'login']);
        Route::get('register', [camara_comercioRegister::class, 'showRegistrationForm'])->name('register');
        Route::post('register', [camara_comercioRegister::class, 'register']);
        Route::get('dashboard', [camara_comercioDashboardController::class, 'index'])->name('dashboard');
        Route::post('logout', [camara_comercioLogin::class, 'logout'])->name('logout');
    });

    // Rutas para cámara de comercio autenticada
    Route::middleware('auth:camara_comercio')->group(function () {
        // Ruta para el dashboard de la cámara de comercio
        Route::get('dashboard', [Camara_comercioDashboardController::class, 'index'])->name('dashboard');

        // Rutas para eventos
        Route::get('events', [EventCamaraComercioController::class, 'index'])->name('events'); // Ver eventos
        Route::get('events/create', [EventCamaraComercioController::class, 'create'])->name('events.create'); // Crear evento
        Route::post('events', [EventCamaraComercioController::class, 'store'])->name('events.store'); // Almacenar evento

        // Ruta de logout
        Route::post('logout', [camara_comercioLogin::class, 'logout'])->name('logout');
    });
});

// Rutas para la página pública (sin autenticación)
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Rutas para eventos públicos (acceso sin login)
Route::get('/camara_comercio/events', [EventCamaraComercioController::class, 'index'])->name('events');

// Estas rutas estarán disponibles públicamente para ver los eventos sin necesidad de estar autenticado.

// Rutas generales
// Aquí puedes agregar más rutas generales si es necesario.

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
