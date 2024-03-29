<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;
use Inertia\Inertia;

class CategoriaController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Categoria::class, 'categoria');
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Categoria::all();
        return Inertia::render('Categoria/Index',[
            'categories' => $categories
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Categoria::all();
        return Inertia::render("Categoria/Create", [
            'categories' => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nombre' => ['required', 'string', 'min:3', 'max:30', 'not_regex:/[^\w ]/'],
            'imagen' => ['nullable', File::image()
                ->max(2 * 1024)
                ->dimensions(
                    Rule::dimensions()
                        ->maxWidth(2000)
                        ->maxHeight(2000)
                )]
        ]);

        $categoria = new Categoria;
        $categoria->nombre = $validatedData['nombre'];

        if (isset($validatedData['imagen'])) {
            $path = $validatedData['imagen']->store('categorias', 'images');
            $url = asset('/storage/images/'.$path);
            $categoria->imagen = $url;
        }

        $categoria->save();

        return to_route('categorias.create')->with('message', [
            'message' => 'Categoria creada',
            'priority' => 'success'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Categoria $categoria)
    {
        $categoria->load(['productos']);
        return Inertia::render('Categoria/Show', [
            'categoria' => $categoria
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Categoria $categoria)
    {
        return Inertia::render('Categoria/Edit',[
            'categoria' => $categoria
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Categoria $categoria)
    {
        $validatedData = $request->validate([
            'nombre' => ['required', 'string', 'min:3', 'max:30', 'not_regex:/[^\w ]/'],
            'imagen' => ['nullable', File::image()
                ->max(2 * 1024)
                ->dimensions(
                    Rule::dimensions()
                        ->maxWidth(2000)
                        ->maxHeight(2000)
                )],
            'setToDefaultImage' => ['required_without:imagen', 'boolean']
        ]);

        $categoria->nombre = $validatedData['nombre'];

        if (isset($validatedData['imagen'])) {
            if ($categoria->imagen !== "/storage/images/resources/open-box.png") {
                $lastImage = $categoria->imagen;
            }
            $path = $validatedData['imagen']->store('categorias', 'images');
            $url = asset('/storage/images/'.$path);
            $categoria->imagen = $url;
        }

        if ($validatedData['setToDefaultImage'] && !isset($validatedData['imagen'])) {
            if ($categoria->imagen !== "/storage/images/resources/open-box.png") {
                $lastImage = $categoria->imagen;
            }
            $categoria->imagen = '/storage/images/resources/open-box.png';
        }

        if ($categoria->isDirty()) {
            $categoria->save();
            if (isset($lastImage)) {
                $url = parse_url($lastImage);
                $basename = pathinfo($url['path'])['basename'];
                Storage::disk('images')->delete('categorias/'.$basename);
            }
            $request->session()->flash('message', [
                'message' => 'Categoria actualizada',
                'priority' => 'success'
            ]);
        } else {
            $request->session()->flash('message', [
                'message' => 'No se realizaron cambios',
                'priority' => 'info'
            ]);
        }



        return to_route('categorias.edit', $categoria);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Categoria $categoria)
    {
        //
    }
}
