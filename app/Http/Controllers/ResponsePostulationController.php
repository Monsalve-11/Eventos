<?php
namespace App\Http\Controllers;

use App\Models\Postulation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ResponsePostulationController extends Controller
{
    // Mostrar las postulaciones divididas en tres secciones
    public function index()
    {
        $pending = Postulation::whereNull('response')->get();  // Postulaciones pendientes (sin respuesta)
        $accepted = Postulation::where('response', true)->get();  // Postulaciones aceptadas
        $rejected = Postulation::where('response', false)->get();  // Postulaciones rechazadas

        return Inertia::render('Postulations/ResponseIndex', [
            'pending' => $pending,
            'accepted' => $accepted,
            'rejected' => $rejected,
        ]);
    }

    // Aceptar una postulación
    public function accept($postulationId)
    {
        $postulation = Postulation::findOrFail($postulationId);
        $postulation->response = true;  // Marcar la postulación como aceptada
        $postulation->save();

        return back()->with('success', 'Postulación aceptada.');
    }

    // Rechazar una postulación
    public function reject($postulationId)
    {
        $postulation = Postulation::findOrFail($postulationId);
        $postulation->response = false;  // Marcar la postulación como rechazada
        $postulation->save();

        return back()->with('success', 'Postulación rechazada.');
    }
}
