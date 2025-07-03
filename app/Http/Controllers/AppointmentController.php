<?php
namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Evento;
use App\Models\Postulation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    // Mostrar los eventos disponibles para los usuarios con rol "persona natural"
    public function index()
    {
        $user = auth()->user();

        // Verificar si el usuario tiene el rol "persona natural"
        if (!$user->roles->contains('name', 'persona natural')) {
            return redirect()->back()->with('error', 'Solo las personas naturales pueden agendar citas.');
        }

        // Obtener los eventos disponibles
        $events = Evento::all();  // Puedes filtrar los eventos según sea necesario

        return Inertia::render('Citas/Index', [
            'events' => $events,
        ]);
    }

    // Agendar una cita para una persona natural
public function store(Request $request)
{
    // Validar los datos de la cita
    $request->validate([
        'event_id' => 'required|exists:eventos,id', // Referencia a la tabla 'eventos'
        'date' => 'required|date',
        'start_time' => 'required|date_format:H:i',
        'end_time' => 'required|date_format:H:i|after:start_time',  // Validar que la hora de fin sea posterior a la hora de inicio
        'company_id' => 'required|exists:users,id', // Validar que la empresa exista en la base de datos
    ]);

    // Obtener los usuarios aceptados para el evento seleccionado
    $acceptedCompanies = Postulation::where('event_id', $request->event_id)
        ->where('response', true)  // Solo aceptados
        ->pluck('user_id');  // Obtener los ID de las empresas aceptadas

    // Verificar si la empresa seleccionada está entre las aceptadas
    $companyId = $request->company_id;  // ID de la empresa seleccionada

    if (!in_array($companyId, $acceptedCompanies->toArray())) {
        return back()->with('error', 'La empresa seleccionada no está aceptada para este evento.');
    }

    // Crear la cita
    Appointment::create([
        'user_id' => auth()->id(),  // El ID del usuario (persona natural)
        'company_id' => $request->company_id,  // El ID de la empresa seleccionada
        'event_id' => $request->event_id,  // El ID del evento seleccionado
        'date' => $request->date,
        'start_time' => $request->start_time,
        'end_time' => $request->end_time,
    ]);

    return back()->with('success', 'Cita agendada correctamente.');
}


    // Mostrar los usuarios que se han postulado y aceptado para el evento seleccionado
    public function getUsersForEvent($eventId)
    {
        // Obtener los usuarios aceptados para un evento
        $acceptedUsers = Postulation::where('event_id', $eventId)
            ->where('response', true)  // Filtrar solo los usuarios aceptados
            ->with('user')  // Cargar la relación con el usuario
            ->get()
            ->map(function ($postulation) {
                return $postulation->user;  // Devolver solo los usuarios aceptados
            });

        return response()->json($acceptedUsers);  // Devolver la respuesta en formato JSON
    }
}
