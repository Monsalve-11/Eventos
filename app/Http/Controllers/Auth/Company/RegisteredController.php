<?php

namespace App\Http\Controllers\Auth\Company;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Company;

class RegisteredController extends Controller
{
    public function showRegistrationForm()
    {
        return Inertia::render('auth/company/Register');
    }

    public function register(Request $request)
    {
        // Validar los datos del formulario
        $data = $request->validate([
            'name'                  => 'required|string|max:255',
            'email'                 => 'required|email|unique:companies',
            'password'              => 'required|confirmed|min:8',
        ]);

        // Crear la nueva empresa
        $company = Company::create([
            'name'     => $data['name'],
            'email'    => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        // Autenticación de la empresa
        Auth::guard('company')->login($company);

        // Redirigir a la página del dashboard de la empresa
        return redirect()->route('company.dashboard');
    }
}
