<?php

// En app/Http/Controllers/CompanyDashboardController.php
namespace App\Http\Controllers;

use Inertia\Inertia;

class CompanyDashboardController extends Controller
{
    public function index()
    {
        // Aquí puedes cargar datos específicos de la empresa y pasarlos a la vista
        return Inertia::render('auth/company/dashboard');
    }
}
