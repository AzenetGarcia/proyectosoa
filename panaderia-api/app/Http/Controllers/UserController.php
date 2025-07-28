<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    // Mostrar todos los usuarios (Método index)
    public function index()
    {
        // Obtener todos los usuarios
        $users = User::all();

        return response()->json($users);
    }

    // Crear un nuevo usuario (Método store)
    public function store(Request $request)
    {
         // Log de los datos recibidos
    Log::info('Datos recibidos para crear un usuario:', $request->all());

    // Validación de los datos
    $validator = Validator::make($request->all(), [
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'password' => 'required|string|min:8|confirmed',
        'role' => 'required|string|in:admin,vendedor,customer', // Validación de rol
    ]);

    if ($validator->fails()) {
        Log::error('Errores de validación al crear el usuario:', $validator->errors()->toArray());
        return response()->json(['error' => $validator->errors()], 400);
    }

    // Crear el usuario
    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
        'role' => $request->role, // Asignar el rol
    ]);

    // Log para confirmar que el usuario fue creado
    Log::info('Usuario creado con éxito:', $user->toArray());

    return response()->json(['message' => 'Usuario creado con éxito', 'user' => $user], 201);
}

    // Mostrar un solo usuario (Método show)
    public function show($id)
    {
        // Buscar el usuario por ID
        $user = User::find($id);

        if (!$user) {
            return response()->json(['error' => 'Usuario no encontrado'], 404);
        }

        return response()->json($user);
    }

    // Actualizar un usuario (Método update)
    public function update(Request $request, $id)
    {
         // Log de los datos recibidos
    Log::info("Datos recibidos para actualizar el usuario con ID {$id}:", $request->all());

    // Buscar el usuario por ID
    $user = User::find($id);

    if (!$user) {
        Log::error("Usuario con ID {$id} no encontrado.");
        return response()->json(['error' => 'Usuario no encontrado'], 404);
    }

    // Validación de los datos
    $validator = Validator::make($request->all(), [
        'name' => 'sometimes|required|string|max:255',
        'email' => 'sometimes|required|string|email|max:255|unique:users,email,' . $id,
        'password' => 'sometimes|required|string|min:8|confirmed',
        'role' => 'sometimes|required|string|in:admin,vendedor,customer', // Validación de rol
    ]);

    if ($validator->fails()) {
        Log::error('Errores de validación al actualizar el usuario:', $validator->errors()->toArray());
        return response()->json(['error' => $validator->errors()], 400);
    }

    // Actualizamos el usuario
    $user->update($request->all());

    // Log para confirmar que el rol fue asignado correctamente
    Log::info("Usuario actualizado con éxito (ID: {$id}):", $user->toArray());

    return response()->json(['message' => 'Usuario actualizado con éxito', 'user' => $user]);
    }

    // Eliminar un usuario (Método destroy)
    public function destroy($id)
    {
        // Buscar el usuario por ID
        $user = User::find($id);

        if (!$user) {
            return response()->json(['error' => 'Usuario no encontrado'], 404);
        }

        // Eliminar el usuario
        $user->delete();

        return response()->json(['message' => 'Usuario eliminado con éxito']);
    }
}
