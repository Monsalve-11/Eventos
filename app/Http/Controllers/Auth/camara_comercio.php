<?php


// app/Http/Controllers/Auth/Ccc/RegisteredController.php
namespace App\Http\Controllers\Auth\Ccc;

use App\Http\Controllers\Controller;
use App\Models\Ccc;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class RegisteredController extends Controller
{
    public function showRegistrationForm() {
        return view('ccc.auth.register');
    }

    public function register(Request $request) {
        $data = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|string|email|max:255|unique:cccs',
            'password' => ['required','confirmed', Password::defaults()],
        ]);

        Ccc::create([
            'name'     => $data['name'],
            'email'    => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        return redirect()->route('ccc.login')->with('success','Cuenta CCC creada.');
    }
}

// app/Http/Controllers/Auth/Ccc/LoginController.php
namespace App\Http\Controllers\Auth\Ccc;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function showLoginForm() {
        return view('ccc.auth.login');
    }

    public function login(Request $request) {
        $credentials = $request->validate([
            'email'    => 'required|email',
            'password' => 'required|string',
        ]);

        if (Auth::guard('ccc')->attempt($credentials, $request->filled('remember'))) {
            $request->session()->regenerate();
            return redirect()->intended(route('events.index'));
        }

        return back()->withErrors([
            'email' => 'Credenciales incorrectas.',
        ]);
    }

    public function logout(Request $request) {
        Auth::guard('ccc')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect()->route('ccc.login');
    }
}
