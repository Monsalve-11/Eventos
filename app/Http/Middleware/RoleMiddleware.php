<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RoleMiddleware
{
   // app/Http/Middleware/RoleMiddleware.php
public function handle(Request $request, Closure $next, $role)
{
    if (Auth::check() && Auth::user()->role === $role) {
        return $next($request);
    }

    return redirect()->route('dashboard')->with('error', 'No tienes permisos para acceder a esta página');
}

}
