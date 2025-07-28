<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\UserController;

Route::get('/', function () {
    return response()->json(['message' => 'API funcionando correctamente']);
});

// Definir rutas RESTful para el recurso "products"
Route::resource('products', ProductController::class)
    ->only(['index', 'store', 'show', 'update', 'destroy'])
    ->names('api.products'); // Aquí el nombre debe coincidir con el recurso 'products'

Route::get('/users', [UserController::class, 'index']);  // Listar todos los usuarios
Route::post('/users', [UserController::class, 'store']);  // Crear un nuevo usuario
Route::get('/users/{id}', [UserController::class, 'show']);  // Mostrar un usuario por ID
Route::put('/users/{id}', [UserController::class, 'update']);  // Actualizar un usuario
Route::delete('/users/{id}', [UserController::class, 'destroy']); 