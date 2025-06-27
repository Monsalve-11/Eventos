<?php
namespace App\Http\Controllers;

use App\Models\Postulation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ResponsePostulationController extends Controller
{
// En el ResponsePostulationController.php
public function index()
{
    // Obtener las postulaciones con las relaciones
    $pending = Postulation::with(['user', 'event'])->whereNull('response')->get();
    $accepted = Postulation::with(['user', 'event'])->where('response', true)->get();
    $rejected = Postulation::with(['user', 'event'])->where('response', false)->get();

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

        // Regresar con un mensaje de éxito
        return back()->with('success', 'Postulación aceptada.');
    }

    // Rechazar una postulación
    public function reject($postulationId)
    {
        $postulation = Postulation::findOrFail($postulationId);
        $postulation->response = false;  // Marcar la postulación como rechazada
        $postulation->save();

        // Regresar con un mensaje de éxito
        return back()->with('success', 'Postulación rechazada.');
    }
}
