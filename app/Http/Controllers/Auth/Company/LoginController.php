<?php
// app/Http/Controllers/Auth/Company/LoginController.php
namespace App\Http\Controllers\Auth\Company;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LoginController extends Controller
{
    public function showLoginForm()
    {
        return Inertia::render('auth/company/login');
    }

   public function login(Request $request)
{
    // Validación de las credenciales de la empresa
    $credentials = $request->validate([
        'email'    => 'required|email',
        'password' => 'required|string',
    ]);

    // Intentar autenticar usando el guard 'company'
    if (Auth::guard('company')->attempt($credentials, $request->boolean('remember'))) {
        $request->session()->regenerate();  // Regenerar la sesión para prevenir fijación de sesión
        return redirect()->intended(route('company.dashboard'));  // Redirigir a dashboard de la empresa
    }

}


    public function logout(Request $request)
    {
        // Cerrar sesión de la empresa
        Auth::guard('company')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect()->route('company.login');  // Redirigir a la página de login
    }
}
