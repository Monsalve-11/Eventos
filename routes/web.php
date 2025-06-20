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
use App\Http\Controllers\EventCamaraComercioController;
use App\Http\Controllers\Auth\camara_comercio\RegisteredController as camara_comercioRegister;
use App\Http\Controllers\Auth\camara_comercio\LoginController as camara_comercioLogin;
use App\Http\Controllers\Auth\Company\RegisteredController as CompanyRegister;
use App\Http\Controllers\Auth\Company\LoginController as CompanyLogin;



Route::middleware(['auth:camara_comercio'])->prefix('camara_comercio')->name('camara_comercio.')->group(function () {
    Route::get('events', [EventCamaraComercioController::class, 'index'])->name('events');
    Route::get('events/create', [EventCamaraComercioController::class, 'create'])->name('events.create');
  
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('events', function () {
        return Inertia::render('events');
    })->name('events');

    Route::get('events', [UserController::class, 'index'])->name('events');
    Route::get('/user/events/{eventId}', [UserController::class, 'show'])->name('user.eventDetails'); // Ver detalles de evento

    Route::get('/user/events', [UserEventController::class, 'index'])->name('user.events');

    Route::get('/user/events/{eventId}', [UserEventController::class, 'show'])->name('user.eventDetails');
});

// Rutas de la empresa (Company)
Route::prefix('company')->name('company.')->group(function(){
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
        // Dashboard
        Route::get('dashboard', [camara_comercioDashboardController::class, 'index'])->name('dashboard');
        
        // Rutas para eventos
        Route::get('events', [EventCamaraComercioController::class, 'index'])->name('events'); 
        Route::get('events/create', [EventCamaraComercioController::class, 'create'])->name('events.create'); 
          Route::post('events', [EventCamaraComercioController::class, 'store'])->name('events.store');  
        // Ruta de logout
        Route::post('logout', [camara_comercioLogin::class, 'logout'])->name('logout');
    });
     Route::post('events', [EventCamaraComercioController::class, 'store'])->name('events.store'); 
});
    Route::post('events', [EventCamaraComercioController::class, 'store'])->name('events.store'); 
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Rutas para eventos públicos
Route::get('/camara_comercio/events', [EventCamaraComercioController::class, 'index'])->name('events');

// autenticados
Route::middleware(['auth:camara_comercio'])->get('/camara_comercio/events', function () {
    return Inertia::render('camara_comercio/events_camara_comercio'); 
})->name('camara_comercio.events');

// Rutas de creación de eventos 
Route::prefix('camara_comercio')->name('camara_comercio.')->group(function () {
    Route::get('events', [EventCamaraComercioController::class, 'index'])->name('events');
    Route::get('events/create', [EventCamaraComercioController::class, 'create'])->name('events.create'); 
    Route::post('events', [EventCamaraComercioController::class, 'store'])->name('events.store'); 
});

Route::middleware('auth')->prefix('camara_comercio')->name('camara_comercio.')->group(function () {
    Route::get('/events', [EventCamaraComercioController::class, 'index'])->name('events');
    Route::get('/events/create', [EventCamaraComercioController::class, 'create'])->name('events.create');
    Route::post('/events', [EventCamaraComercioController::class, 'store'])->name('events.store');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
