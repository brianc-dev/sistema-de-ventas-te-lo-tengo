<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{ProductoController};

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::view('/', 'home');

Route::get('/registrarse', function () {
    return 'Registrarse';
});

Route::get('/ingresar', function () {
    return 'Iniciar sesión';
});

Route::get('/contacto', function () {
    return 'Contacto';
});

Route::get('/informacion', function () {
    return 'Sobre nosotros';
});

Route::resource('productos', ProductoController::class);