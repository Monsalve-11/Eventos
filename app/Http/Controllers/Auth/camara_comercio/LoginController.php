<?php
namespace App\Http\Controllers\Auth\Camara_comercio;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LoginController extends Controller
{
    public function showLoginForm()
    {
        return Inertia::render('auth/camara_comercio/login');
    }

    public function login(Request $request)
    {
        // Validación de las credenciales de la empresa
        $credentials = $request->validate([
            'email'    => 'required|email',
            'password' => 'required|string',
        ]);

        // Intentar autenticar usando el guard 'camara_comercio'
        if (Auth::guard('camara_comercio')->attempt($credentials, $request->boolean('remember'))) {
            $request->session()->regenerate();  // Regenerar la sesión para prevenir fijación de sesión
            return redirect()->intended(route('camara_comercio.dashboard'));  // Redirigir a dashboard de la empresa
        }

        // Si no se puede autenticar
        return back()->withErrors([
            'email' => 'Las credenciales no coinciden con nuestros registros.',
        ]);
    }

    public function logout(Request $request)
    {
        // Cerrar sesión de la empresa
        Auth::guard('camara_comercio')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect()->route('camara_comercio.login');  // Redirigir a la página de login
    }
}
