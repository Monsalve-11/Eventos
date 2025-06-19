<?php


// app/Http/Controllers/Auth/Company/RegisteredController.php
namespace App\Http\Controllers\Auth\Company;

use App\Http\Controllers\Controller;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class RegisteredController extends Controller
{
    public function showRegistrationForm() {
        return view('Company.auth.register');
    }

    public function register(Request $request) {
        $data = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|string|email|max:255|unique:Companys',
            'password' => ['required','confirmed', Password::defaults()],
        ]);

        Company::create([
            'name'     => $data['name'],
            'email'    => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        return redirect()->route('Company.login')->with('success','Cuenta Company creada.');
    }
}

// app/Http/Controllers/Auth/Company/LoginController.php
namespace App\Http\Controllers\Auth\Company;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function showLoginForm() {
        return view('Company.auth.login');
    }

    public function login(Request $request) {
        $credentials = $request->validate([
            'email'    => 'required|email',
            'password' => 'required|string',
        ]);

        if (Auth::guard('Company')->attempt($credentials, $request->filled('remember'))) {
            $request->session()->regenerate();
            return redirect()->intended(route('events.index'));
        }

        return back()->withErrors([
            'email' => 'Credenciales incorrectas.',
        ]);
    }

    public function logout(Request $request) {
        Auth::guard('Company')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect()->route('Company.login');
    }
}
