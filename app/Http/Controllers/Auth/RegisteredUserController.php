<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\{User, Cliente};
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    private const IS_USER_ACTIVE_DEFAULT = true;
    private const MAX_CEDULA_VALUE = 50000000;
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'username' => 'required|string|alpha_num:ascii|lowercase|max:30|unique:'.User::class,
            'email' => 'required|string|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'condicion' => 'required|string|size:1|in:V,E',
            'cedula' => 'required|numeric|integer|between:1,'.self::MAX_CEDULA_VALUE.'|unique:'.Cliente::class,
            'nombre' => 'required|string|alpha',
            'apellido' => 'required|string|alpha',
            'telefono' => 'sometimes|nullable|string|size:12|regex:/^02[0-9]{2}-[0-9]{7}$/',
        ]);

        $user = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'active' => self::IS_USER_ACTIVE_DEFAULT
        ]);

        $cliente = Cliente::create([
            'condicion' => $request->input('condicion'),
            'cedula' => $request->input('cedula'),
            'nombre' => $request->input('nombre'),
            'apellido' => $request->input('apellido'),
            'telefono' => $request->input('telefono'),
            'user_id' => $user->id
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }
}
