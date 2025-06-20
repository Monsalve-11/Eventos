<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class EventCamaraComercioController extends Controller
{
    // Mostrar todos los eventos
    public function index()
{
    $events = Event::all();

    return Inertia::render('components/events_camara_comercio', [
        'events' => $events->toArray(), 
    ]);
}

    public function create()
    {
        return Inertia::render('components/CreateEventForm');

    }



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
    'camara_comercio_id' => Auth::user(), 
]);

    // Redirigir a la lista de eventos de cámara de comercio
 //   return redirect()->route('camara_comercio.events');
}



}
