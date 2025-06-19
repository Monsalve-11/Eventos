<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    // Método para mostrar el formulario de creación de usuario
    public function create()
    {
        $companies = Company::all(); // Obtener todas las empresas
        return view('usuarios.create', compact('companies')); // Pasar las empresas a la vista
    }

    // Método para almacenar el usuario
    public function store(Request $request)
    {
       {
    // Validar los datos del usuario
    $validatedData = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email',
        'password' => 'required|string|min:8|confirmed',
        'role' => 'required|in:ccc,empresa,persona_natural', // Validamos el rol
        // Validar company_id solo si el rol es 'empresa'
        'company_id' => $request->role === 'empresa' ? 'required|exists:companies,id' : 'nullable',
    ]);

    // Crear el usuario
    $user = User::create([
        'name' => $validatedData['name'],
        'email' => $validatedData['email'],
        'password' => bcrypt($validatedData['password']),
        'role' => $validatedData['role'],
        // Asignar company_id solo si el rol es 'empresa'
        'company_id' => $validatedData['role'] === 'empresa' ? $validatedData['company_id'] : null,
    ]);

    return redirect()->route('dashboard')->with('success', 'Usuario creado exitosamente.');
}
    }
}
