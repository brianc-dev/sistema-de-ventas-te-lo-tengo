<?php

use App\Http\Controllers\{ProfileController, ProductoController, CarritoController, PerfilController};
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::resource('/productos', ProductoController::class)->only(['index', 'show']);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/carrito', [CarritoController::class, 'index'])->name('carrito.index');
    Route::post('/carrito', [CarritoController::class, 'add'])->name('carrito.add');
    Route::delete('/carrito', [CarritoController::class, 'remove'])->name('carrito.remove');
    Route::patch('/carrito', [CarritoController::class, 'update'])->name('carrito.update');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/cartera', [CarteraController::class, 'index'])->name('cartera.index');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/perfil', [PerfilController::class, 'edit'])->name('perfil.edit');
    Route::patch('/perfil', [perfilController::class, 'update'])->name('perfil.update');
});

// Admin routes
Route::prefix('admin')->group(function() {
    Route::resource('/productos', ProductoController::class)->except(['index', 'show']);
})->middleware('auth');

require __DIR__.'/auth.php';
