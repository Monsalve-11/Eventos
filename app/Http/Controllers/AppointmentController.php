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
        'event_id' => 'required|exists:eventos,id',
        'date' => 'required|date',
        'start_time' => 'required|date_format:H:i',
        'end_time' => 'required|date_format:H:i|after:start_time',
        'company_id' => 'required|exists:users,id',
    ]);

    // Obtener los usuarios aceptados para el evento seleccionado
    $acceptedCompanies = Postulation::where('event_id', $request->event_id)
        ->where('response', true)
        ->pluck('user_id');

    $companyId = $request->company_id;

    // Verificar si la empresa seleccionada está entre las aceptadas
    if (!in_array($companyId, $acceptedCompanies->toArray())) {
        return back()->with('error', 'La empresa seleccionada no está aceptada para este evento.');
    }

    // Validar si la hora de inicio es antes de la hora de fin
    $startDateTime = new \DateTime("{$request->date} {$request->start_time}");
    $endDateTime = new \DateTime("{$request->date} {$request->end_time}");

    if ($startDateTime >= $endDateTime) {
        return back()->with('error', 'La hora de inicio debe ser antes de la hora de fin.');
    }

    // Crear la cita
    Appointment::create([
        'user_id' => auth()->id(),
        'company_id' => $companyId,
        'event_id' => $request->event_id,
        'date' => $request->date,
        'start_time' => $request->start_time,
        'end_time' => $request->end_time,
    ]);

     return Inertia::render('Citas/Index');
}



    // Mostrar los usuarios que se han postulado y aceptado para el evento seleccionado
    public function getUsersForEvent($eventId)
    {
        // Obtener los usuarios aceptados para un evento
        $acceptedUsers = Postulation::where('event_id', $eventId)
            ->where('response', true)  // Filtrar usuarios aceptados
            ->with('user') 
            ->get()
            ->map(function ($postulation) {
                return $postulation->user;  // solo los usuarios aceptados
            });

        return response()->json($acceptedUsers);  // la respuesta
    }
}
