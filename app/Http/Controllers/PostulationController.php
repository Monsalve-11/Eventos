<?php

namespace App\Http\Controllers;

use App\Models\Evento;
use App\Models\Postulation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostulationController extends Controller
{
    // Mostrar los eventos disponibles para postularse
    public function index()
    {
        $events = Evento::all();  // Obtener todos los eventos
        return Inertia::render('Postulations/Index', ['events' => $events]); // Pasar los eventos a la vista
    }

    // Permitir que un usuario se postule a un evento
    public function store(Request $request, $eventId)
    {
        $user = auth()->user(); // Obtener el usuario autenticado

        // Verificar si el usuario tiene el rol "empresa" (id = 2)
        if (!$user->roles()->where('roles.id', 2)->exists()) {
            return back()->with('error', 'Solo los usuarios con el rol de empresa pueden postularse.');
        }

        // Verificar si ya se postuló a este evento
        if (Postulation::where('user_id', $user->id)->where('event_id', $eventId)->exists()) {
            return back()->with('error', 'Ya te has postulado a este evento.');
        }

        // Crear la postulación
        Postulation::create([
            'user_id' => $user->id,
            'event_id' => $eventId,
        ]);

        return back()->with('success', 'Te has postulado al evento exitosamente.');
    }

    // Eliminar una postulación de un evento
    public function destroy($eventId)
    {
        $user = auth()->user(); // Obtener el usuario autenticado
        $postulation = Postulation::where('user_id', $user->id)->where('event_id', $eventId)->first();

        if ($postulation) {
            $postulation->delete(); // Eliminar la postulación
            return back()->with('success', 'Tu postulación ha sido eliminada.');
        }

        return back()->with('error', 'No tienes una postulación para este evento.');
    }
}
