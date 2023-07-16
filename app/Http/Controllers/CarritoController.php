<?php

namespace App\Http\Controllers;

use App\Models\{Carrito, Producto};
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CarritoController extends Controller
{
    public function index(Request $request): Response {
        $this->authorize('index', Carrito::class);

        $carrito = $request->user()->cliente->carrito;
        $productos = $carrito->productos()->with(['imagenes'])->get();

        return Inertia::render('Carrito/Index', [
            'productos' => $productos
        ]);
    }

    public function add(Request $request) {
        $this->authorize('add', Carrito::class);

        $validatedId = $request->validate([
            'productoId' => 'required|ulid|exists:productos,id'
        ]);

        $availability = Producto::all()->find($validatedId['productoId'])->cantidad;

        $validatedQuantity = $request->validate([
            'cantidad' => ['required', 'numeric', 'integer', "between:1,$availability"]
        ]);

        $carrito = $request->user()->cliente->carrito;
        $carrito->productos()->attach($validatedId['productoId'], ['cantidad' => $validatedQuantity['cantidad']]);

        $request->session()->flash('message', [
            'message' => 'Producto agregado al carrito',
            'priority' => 'success']);

        return to_route("carrito.index");
    }

    public function remove(Request $request) {
        $this->authorize('remove', Carrito::class);

        $validatedId = $request->validate([
            'productoId' => 'required|ulid|exists:productos,id'
        ])['productoId'];

        $carrito = $request->user()->cliente->carrito;
        $carrito->productos()->detach($validatedId);

        $request->session()->flash('message', [
            'message' => 'Producto removido',
            'priority' => 'success'
        ]);

        return to_route('carrito.index');
    }

    public function update(Request $request) {
        $this->authorize('update', Carrito::class);

        $validatedId = $request->validate([
            'productoId' => 'required|ulid|exists:productos,id'
        ])['productoId'];

        $availability = Producto::all()->find($validatedId)->cantidad;

        $validatedQuantity = $request->validate([
            'cantidad' => 'required|numeric|integer|min:1|max:'.$availability
        ])['cantidad'];

        $carrito = $request->user()->cliente->carrito;
        $carrito->productos()->updateExistingPivot($validatedId, ['cantidad' => $validatedQuantity]);

        $request->session()->flash('message', [
            'message' => 'Cantidad actualizada',
            'priority' => 'success'
        ]);

        return to_route('carrito.index');
    }
}
