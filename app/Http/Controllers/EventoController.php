<?php

namespace App\Http\Controllers;

use App\Models\Evento;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventoController extends Controller
{
    // Mostrar todos los eventos
    public function index()
    {
        $eventos = Evento::all();
        return Inertia::render('Eventos/Index', ['eventos' => $eventos]);
    }

    // Mostrar el formulario para crear un nuevo evento
    public function create()
    {
        return Inertia::render('Eventos/Create');
    }

    // Almacenar un nuevo evento
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'descripcion' => 'required',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date',
        ]);

        Evento::create([
            'name' => $request->name,
            'descripcion' => $request->descripcion,
            'fecha_inicio' => $request->fecha_inicio,
            'fecha_fin' => $request->fecha_fin,
            'user_id' => auth()->id(), // Asocia el evento con el usuario logueado
        ]);

        return redirect()->route('eventos.index');
    }

    // Mostrar el evento específico para editar
    public function edit(Evento $evento)
    {
        return Inertia::render('Eventos/Edit', ['evento' => $evento]);
    }

    // Actualizar el evento
    public function update(Request $request, Evento $evento)
    {
        $request->validate([
            'name' => 'required',
            'descripcion' => 'required',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date',
        ]);

        $evento->update([
            'name' => $request->name,
            'descripcion' => $request->descripcion,
            'fecha_inicio' => $request->fecha_inicio,
            'fecha_fin' => $request->fecha_fin,
        ]);

        return redirect()->route('eventos.index');
    }

    
   public function destroy(Evento $evento)
{
    $evento->delete();
    return redirect()->route('eventos.index'); 
}

}
