<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

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
                    'email' => ['required', 'string', 'email', 'max:255', Rule::unique(User::class)->ignore($this->user()->id)]
                ]);

                $request->user()->fill($validatedData);

                if ($request->user()->isDirty('email')) {
                    $request->user()->email_verified_at = null;
                    $request->user()->save();

                    Inertia::share('flash', [
                        'message' => "Email actualizado exitosamente"
                    ]);
                }

                break;
            case 'perfil':
                // $validatedData = $request->validate([
                //     'email' => ['required', 'string', 'email', 'max:255', Rule::unique(User::class)->ignore($this->user()->id)]
                // ]);
                break;
            default:
                # code...
                break;
        }
    }
}
