<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use Inertia\Inertia;
use Illuminate\Http\Request;

class UserController extends Controller
{
    // Mostrar usuarios con sus roles
    public function index()
    {
        // Usar Inertia para devolver la vista
        return Inertia::render('Users/Index', [
            'users' => User::with('roles')->get()
        ]);
    }

    // Asignar un rol a un usuario
    public function assignRole(Request $request, $userId)
    {
        $user = User::findOrFail($userId);
        $role = Role::findOrFail($request->role_id);

        $user->roles()->attach($role);

    }

    // Eliminar un rol de un usuario
    public function removeRole(Request $request, $userId)
    {
        $user = User::findOrFail($userId);
        $role = Role::findOrFail($request->role_id);

        $user->roles()->detach($role);

    }
}
