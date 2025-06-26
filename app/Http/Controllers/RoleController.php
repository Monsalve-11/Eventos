<?php
namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoleController extends Controller
{
    // Mostrar todos los usuarios con sus roles
    public function index()
    {
        $users = User::with('roles')->get();  // Obtener usuarios con roles
        $roles = Role::all();  // Obtener todos los roles
        
        return Inertia::render('Roles/Index', [
            'users' => $users,
            'roles' => $roles,
        ]);
    }

    // Asignar un rol a un usuario
    public function assignRole(Request $request, $userId)
    {
        $user = User::findOrFail($userId);
        $role = Role::findOrFail($request->role_id);

        // Asignar el rol
        $user->roles()->attach($role);

        // Devuelves un mensaje exitoso y recargas la página con Inertia
        return Inertia::render('Roles/Index', [
            'users' => User::with('roles')->get(),
            'roles' => Role::all(), 
        ]);
    }

    // Eliminar un rol de un usuario
    public function removeRole(Request $request, $userId)
    {
        $user = User::findOrFail($userId);
        $role = Role::findOrFail($request->role_id);

        // Eliminar el rol
        $user->roles()->detach($role);

        // Devuelves un mensaje exitoso y recargas la página con Inertia
        return Inertia::render('Roles/Index', [
            'users' => User::with('roles')->get(),
            'roles' => Role::all(),
        ]);
    }
}
