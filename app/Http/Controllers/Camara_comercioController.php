<?php

// app/Http/Controllers/Camara_comercioController.php

namespace App\Http\Controllers;

use App\Models\Camara_comercio;
use Illuminate\Http\Request;

class Camara_comercioController extends Controller
{
    // Método para registrar una nueva empresa
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:companies,email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $Camara_comercio = Camara_comercio::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        return redirect()->route('login')->with('success', 'Empresa registrada exitosamente.');
    }
}
