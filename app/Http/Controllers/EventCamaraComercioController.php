<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventCamaraComercioController extends Controller
{
    // Mostrar todos los eventos
public function index()
{
    // Verificar si el usuario está autenticado
    if (!auth()->check()) {
        // Si no está autenticado, redirige al login
        return redirect()->route('camara_comercio.login');
    }

    // Obtener los eventos para la cámara de comercio autenticada
    $events = Event::where('camara_comercio_id', auth()->user()->id)->get();

    // Devolver la vista con los eventos
    return Inertia::render('auth/camara_comercio/events', [
        'events' => $events
    ]);
}


    // Mostrar el formulario para crear un evento
    public function create()
    {
        return Inertia::render('auth/camara_comercio/createEvent');
    }

    // Almacenar un nuevo evento
    public function store(Request $request)
    {
        // Validar la entrada del formulario
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'event_date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i',
        ]);

        // Crear un nuevo evento
        Event::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'event_date' => $validated['event_date'],
            'start_time' => $validated['start_time'],
            'end_time' => $validated['end_time'],
            'camara_comercio_id' => auth()->user()->id, // Asociar el evento con la cámara de comercio autenticada
        ]);

        // Redirigir a la lista de eventos
        return redirect()->route('auth/camara_comercio/events');
    }
}
