<?php
// app/Http/Controllers/EventController.php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Appointment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EventController extends Controller
{
    // Mostrar todos los eventos
    public function index()
    {
        $events = Event::all();
        return view('events.index', compact('events'));
    }

    // Mostrar formulario para que CCC cree un evento
    public function create()
    {
        return view('events.create');
    }

    // Guardar evento creado por el CCC
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'event_date' => 'required|date',
            'event_start_time' => 'required|date_format:H:i',
            'event_end_time' => 'required|date_format:H:i',
        ]);

        Event::create([
            'title' => $request->title,
            'description' => $request->description,
            'event_date' => $request->event_date,
            'event_start_time' => $request->event_start_time,
            'event_end_time' => $request->event_end_time,
            'company_id' => Auth::id(), // Suponemos que el CCC es el creador del evento
        ]);

        return redirect()->route('events.index')->with('success', 'Evento creado exitosamente.');
    }

    // Permitir a los usuarios postularse a un evento
    public function applyForEvent($eventId)
    {
        $event = Event::findOrFail($eventId);

        Appointment::create([
            'user_id' => Auth::id(),
            'event_id' => $event->id,
        ]);

        return redirect()->route('events.index')->with('success', 'Postulación realizada exitosamente.');
    }
}
