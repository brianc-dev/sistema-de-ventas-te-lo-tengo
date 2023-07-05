<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\{Carrito, Producto};
use Inertia\Inertia;
use Inertia\Response;

class CarritoController extends Controller
{
    public function index(Request $request): Response {
        $this->authorize('index', Carrito::class);

        $carrito = $request->user()->cliente->carrito;
        $productos = $carrito->productos->only(['producto_id', 'cantidad']);

        return Inertia::render('Carrito/Index', [
            'productos' => $productos
        ]);
    }

    public function add(Request $request): Response {
        $this->authorize('add', Carrito::class);

        $request->validate([
            'productoId' => 'required|ulid|exists:productos,id'
        ]);

        $availability = Producto::find($request->productoId)->cantidad;

        $request->validate([
            'cantidad' => 'required|numeric|integer|min:1|lte:'.$availability
        ]);

        $carrito = $request->user()->cliente->carrito;
        $carrito->productos->attach($request->productoId, ['cantidad' => $request->cantidad]);

        return $carrito->productos->only(['producto_id', 'cantidad']);
    }

    public function remove(Request $request): Response {
        $this->authorize('remove', Carrito::class);

        $request->validate([
            'productoId' => 'required|ulid|exist:productos,id'
        ]);

        $carrito = $request->user()->cliente->carrito;
        $carrito->productos->detach($request->productoId);

        return $carrito->productos->only(['producto_id', 'cantidad']);
    }

    public function update(Request $request) {
        $this->authorize('update', Carrito::class);

        $request->validate([
            'productoId' => 'required|ulid|exist:productos,id'
        ]);

        $availability = Producto::find($request->productoId)->cantidad;

        $request->validate([
            'cantidad' => 'required|numeric|integer|min:1|lte:'.$availability
        ]);

        $carrito = $request->user()->cliente->carrito;
        $carrito->productos->updateExistingPivot($request->productoId, ['cantidad' => $request->cantidad]);

        return $carrito->productos->only(['producto_id', 'cantidad']);
    }
}
