<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductoController extends Controller
{

    public function __construct() {
        $this->middleware('auth')->except('index', 'show');
        $this->authorizeResource(Producto::class, 'producto');
    }
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $args = [
            'productos' => Producto::all()->sortBy('nombre')->toArray()
        ];
        // TODO: add pagination
        if (session()->has('status')) {
            $status = session('status');
            $args['status'] = $status;
        }

        return Inertia::render('Productos/Index', $args);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Productos/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'codigo' => 'sometimes|string|between:1,10|unique:'.Producto::class,
            'nombre' => 'required|string|alpha_num|between:1,50',
            'cantidad' => 'required|numeric|integer|min:0|max:500',
            'precio' => 'required|numeric|decimal:0,4|min:0',
            'gravado' => 'required|boolean'
        ]);

        $producto = Producto::create([
            'codigo' => $request->codigo,
            'nombre' => $request->nombre,
            'cantidad' => $request->cantidad,
            'precio' => $request->precio,
            'gravado' => $request->gravado
        ]);

        // Todo: redirect to a beautiful page...

        return redirect('productos')->with('status', 'Producto creado exitosamente');
    }

    /**
     * Display the specified resource.
     */
    public function show(Producto $producto)
    {
        return Inertia::render('Productos/Show', ['producto' => $producto]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Producto $producto)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Producto $producto)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Producto $producto)
    {
        //
    }
}
