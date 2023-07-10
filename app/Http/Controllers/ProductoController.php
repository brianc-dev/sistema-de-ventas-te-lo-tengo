<?php

namespace App\Http\Controllers;

use App\Models\Imagen;
use App\Models\Producto;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;
use Inertia\Inertia;
use Inertia\Response;

class ProductoController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth')->except('index', 'show');
        $this->authorizeResource(Producto::class, 'producto');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $productos = Producto::with(['imagenes'])->get()->sortBy('nombre')->toArray();

        // TODO: add pagination

        return Inertia::render('Productos/Index', [
            'productos' => $productos
        ]);
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
        $validatedData = $request->validate([
            'codigo' => 'sometimes|string|between:1,10|unique:' . Producto::class,
            'nombre' => 'required|string|between:1,50|not_regex:/[^\w+\s()-]/',
            'cantidad' => 'required|numeric|integer|min:0|max:500',
            'precio' => 'required|numeric|decimal:0,4|min:0',
            'gravado' => 'required|boolean'
        ]);

        if ($request->hasFile('pictures')) {

            $validatedPictures = Validator::validate($request->file('pictures'), [
                '*' => [
                    'sometimes',
                    File::image()
                        ->max(2 * 1024)
                        ->dimensions(
                            Rule::dimensions()
                                ->maxWidth(2000)
                                ->maxHeight(2000)
                        )
                ]
            ]);
        }

        // save model
        $producto = new Producto($validatedData);
        $producto->save();

        //save files
        if (isset($validatedPictures)) {
            foreach ($validatedPictures as $validatedPicture) {
                $path = $validatedPicture->store('productos', 'images');
                $url = asset('storage/images/'.$path);
                $image = new Imagen([
                    'url' => $url
                ]);
                $producto->imagenes()->save($image);
            }
        }

        // Todo: redirect to a beautiful page...

        return redirect('productos')->with('message', [
            'message' => 'Producto creado exitosamente',
            'priority' => 'success'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Producto $producto)
    {
        $producto->load(['imagenes']);
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
