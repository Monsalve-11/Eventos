<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
     public function index()
    {
        $events = Event::all(); // o la consulta que necesites

        return Inertia::render('User/Events', [
          'events' => $events,
        ]);
    }
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
    ]);

    // Crear el usuario
    $user = User::create([
        'name' => $validatedData['name'],
        'email' => $validatedData['email'],
        'password' => bcrypt($validatedData['password']),
    ]);

    return redirect()->route('events')->with('success', 'Usuario creado exitosamente.');
}
    }
}
