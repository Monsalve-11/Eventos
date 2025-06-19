<?php
namespace App\Http\Controllers\Auth\camara_comercio;

use Inertia\Inertia;

class Camara_comercioDashboardController extends Controller
{
    public function index()
    {

        return Inertia::render('auth/camara_comercio/dashboard');
    }
}
