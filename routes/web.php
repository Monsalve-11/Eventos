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

// routes camara_comercio companies

use App\Http\Controllers\Auth\camara_comercio\RegisteredController as camara_comercioRegister;
use App\Http\Controllers\Auth\camara_comercio\LoginController     as camara_comercioLogin;
use App\Http\Controllers\Auth\Company\RegisteredController as CompanyRegister;
use App\Http\Controllers\Auth\Company\LoginController      as CompanyLogin;


// Página pública

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');


//usuario normal
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

// usuarios empresas
Route::middleware(['auth:company', 'verified'])->group(function () {
    Route::get('company/dashboard', function () {
        return Inertia::render('auth/company/dashboard');
    })->name('company.dashboard');
});

Route::prefix('company')->name('company.')->group(function(){
    Route::middleware('guest:company')->group(function(){
        Route::get('login', [CompanyLogin::class, 'showLoginForm'])->name('login'); // Asegúrate de que el nombre de la ruta sea 'company.login'
        Route::post('login', [CompanyLogin::class, 'login']);
        Route::get('register', [CompanyRegister::class, 'showRegistrationForm'])->name('register');
        Route::post('register', [CompanyRegister::class, 'register']);
         Route::get('dashboard', [CompanyDashboardController::class, 'index'])->name('dashboard');
        Route::post('logout', [CompanyLogin::class, 'logout'])->name('logout');
    });

    Route::middleware('auth:company')->group(function(){
        Route::get('dashboard', [CompanyDashboardController::class, 'index'])->name('dashboard');
        Route::post('logout', [CompanyLogin::class, 'logout'])->name('logout');
    });
});

Route::middleware('auth:company')->get('company/dashboard', [CompanyDashboardController::class, 'index'])->name('company.dashboard');


 /////

//usuarios camra comercio
Route::prefix('camara_comercio')->name('camara_comercio.')->group(function () {
    Route::middleware('guest:camara_comercio')->group(function () {
        Route::get('login', [camara_comercioLogin::class, 'showLoginForm'])->name('login');
        Route::post('login', [camara_comercioLogin::class, 'login']);
        Route::get('register', [camara_comercioRegister::class, 'showRegistrationForm'])->name('register');
        Route::post('register', [camara_comercioRegister::class, 'register']);
          Route::get('dashboard', [camara_comercioDashboardController::class, 'index'])->name('dashboard');
        Route::post('logout', [camara_comercioLogin::class, 'logout'])->name('logout');
    });

    Route::middleware('auth:camara_comercio')->group(function () {
        Route::get('dashboard', [Camara_comercioDashboardController::class, 'index'])->name('dashboard');
        Route::post('logout', [camara_comercioLogin::class, 'logout'])->name('logout');
    });
});

/////////



require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
