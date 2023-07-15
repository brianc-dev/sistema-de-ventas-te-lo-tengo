<?php

namespace App\Policies;

use App\Models\User;

class CarritoPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {

    }

    public function index(User $user) {
        return User::find($user->id)->exists() && $user->active;
    }

    public function add(User $user) {
        return User::find($user->id)->exists() && $user->active;
    }

    public function update(User $user) {
        return User::find($user->id)->exists() && $user->active;
    }

    public function remove(User $user) {
        return User::find($user->id)->exists() && $user->active;
    }
}
