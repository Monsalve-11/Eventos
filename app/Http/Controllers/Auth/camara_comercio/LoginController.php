<?php

namespace App\Http\Controllers\Auth\Camara_comercio;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LoginController extends Controller
{
    /**
     * Muestra el formulario de inicio de sesión para cámara de comercio.
     */
    public function showLoginForm()
    {
        return Inertia::render('auth/camara_comercio/login');
    }

    /**
     * Realiza el inicio de sesión para la cámara de comercio.
     */
    public function login(Request $request)
    {
        // Validación de las credenciales de la cámara de comercio
        $credentials = $request->validate([
            'email'    => 'required|email',
            'password' => 'required|string',
        ]);

        // Intentar autenticar usando el guard 'camara_comercio'
        if (Auth::guard('camara_comercio')->attempt($credentials, $request->boolean('remember'))) {
            // Regenerar la sesión para prevenir fijación de sesión
            $request->session()->regenerate();

            // Redirigir a la página deseada o al dashboard de la cámara de comercio
            return redirect()->intended(route('camara_comercio.dashboard'));
        }

        // Si la autenticación falla, redirigir de nuevo al formulario de login con un error
        return back()->withErrors([
            'email' => 'Las credenciales proporcionadas no coinciden con nuestros registros.',
        ]);
    }

    /**
     * Cierra sesión de la cámara de comercio.
     */
    public function logout(Request $request)
    {
        // Cerrar sesión de la cámara de comercio
        Auth::guard('camara_comercio')->logout();

        // Invalidar la sesión y regenerar el token CSRF
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        // Redirigir a la página de login de cámara de comercio
        return redirect()->route('camara_comercio.login');
    }
}
