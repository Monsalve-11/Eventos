<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Company;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserEventController extends Controller
{
    // Mostrar todos los eventos disponibles
    public function index()
    {
        // Obtener todos los eventos disponibles
        $events = Event::all();

        // Devolver la vista con los eventos
        return Inertia::render('user/events', [
            'events' => $events,
        ]);
    }

    // Mostrar los detalles de un evento específico y las empresas asignadas
    public function show($eventId)
    {
        // Obtener el evento específico por ID
        $event = Event::findOrFail($eventId);

        // Obtener las empresas asociadas a ese evento
        $companies = Company::where('event_id', $eventId)->get();

        // Devolver la vista con el evento y las empresas
        return Inertia::render('user/eventDetails', [
            'event' => $event,
            'companies' => $companies,
        ]);
    }
}
