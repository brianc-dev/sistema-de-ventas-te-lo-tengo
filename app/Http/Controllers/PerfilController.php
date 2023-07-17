<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rule;
use Inertia\Response;
use App\Models\{User};
use Illuminate\Support\Facades\Redirect;

class PerfilController extends Controller
{
    public function edit(Request $request) {
        $user = $request->user();
        $cliente = $user->cliente;
        // $perfil = $user->perfil;

        return Inertia::render('Perfil/Edit', [
            'user' => $user,
            'cliente' => $cliente
        ]);
    }

    public function update(Request $request) {
        $request->validate([
            'form' => 'required|string|in:user,perfil'
        ]);

        switch ($request->input('form')) {
            case 'user':
                $validatedData = $request->validate([
                    'email' => ['required', 'string', 'email', 'max:255', Rule::unique(User::class)->ignore($request->user()->id)]
                ]);

                $request->user()->fill($validatedData);

                if ($request->user()->isDirty('email')) {
                    $request->user()->email_verified_at = null;
                    $request->user()->save();

                    $request->session()->flash('message', ['message' => 'Correo electronico actualizado exitosamente', 'priority' => 'success']);

                    return Redirect::route('perfil.edit');
                }

                break;
            case 'perfil':

                $validatedData = $request->validate([
                    'nombre' => 'required|string|alpha',
                    'apellido' => 'required|string|alpha',
                    'telefono' => 'sometimes|nullable|string|size:12|regex:/^0[0-9]{3}-[0-9]{7}$/',
                ]);

                $request->user()->cliente->fill($validatedData);

                $cliente = $request->user()->cliente;

                if ($cliente->isDirty()) {
                    $cliente->save();

                    $request->session()->flash('message', [
                        'message' => 'Informacion actualizada exitosamente',
                         'priority' => 'success']);

                         return Redirect::route('perfil.edit');
                }

                break;
            default:
                return response(null, 400);
                break;
        }
    }
}
