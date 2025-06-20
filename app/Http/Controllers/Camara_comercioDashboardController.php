<?php

// En app/Http/Controllers/Camara_comercioDashboardController.php
namespace App\Http\Controllers;

use Inertia\Inertia;

class Camara_comercioDashboardController extends Controller
{
    public function index()
    {
        // Aquí puedes cargar datos específicos de la empresa y pasarlos a la vista
        return Inertia::render('auth/camara_comercio/dashboard');
    }
}
