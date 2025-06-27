<?php
// App\Http\Controllers\AppointmentController.php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Evento;
use App\Models\Postulation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    // Mostrar los eventos y las citas disponibles para las empresas
    public function index()
    {
        $user = auth()->user();

        // Verificar si el usuario tiene el rol "empresa"
        if (!$user->roles->contains('name', 'empresa')) {
            return redirect()->back()->with('error', 'Solo las empresas pueden agendar citas.');
        }

        // Obtener los eventos disponibles
        $events = Evento::all();

        return Inertia::render('Citas/Index', [
            'events' => $events,
        ]);
    }

    // Agendar una cita
    public function store(Request $request)
    {
        // Validar los datos
        $request->validate([
            'event_id' => 'required|exists:eventos,id', // Referencia a la tabla 'eventos'
            'date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
        ]);

        // Crear la cita
        Appointment::create([
            'user_id' => auth()->id(), // Usuario que hace la cita
            'company_id' => auth()->user()->id, // ID de la empresa que hace la cita (usuario con rol 'empresa')
            'event_id' => $request->event_id, // Corregido: debe ser 'event_id' y no 'eventos_id'
            'date' => $request->date,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
        ]);

        return back()->with('success', 'Cita agendada correctamente.');
    }

    // Mostrar los usuarios que se han postulado y aceptado para el evento seleccionado
    public function getUsersForEvent($eventId)
    {
        // Obtener los usuarios que están aceptados para un evento
        $acceptedUsers = Postulation::where('event_id', $eventId)
            ->where('response', true)  // Filtrar solo los aceptados
            ->with('user')  // Cargar la relación con el usuario
            ->get()
            ->map(function ($postulation) {
                return $postulation->user;  // Devolver solo los usuarios
            });

        return response()->json($acceptedUsers);
    }
}
