<?php

namespace App\Policies;

use App\Models\Administrador;
use App\Models\Categoria;
use App\Models\User;

class CategoriaPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(?User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(?User $user, Categoria $categoria): bool
    {
        return true;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return Administrador::where('user_id', $user->id)->exists() && $user->active;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Categoria $categoria): bool
    {
        return Administrador::where('user_id', $user->id)->exists() && $user->active;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Categoria $categoria): bool
    {
        return Administrador::where('user_id', $user->id)->exists() && $user->active;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Categoria $categoria): bool
    {
        return Administrador::where('user_id', $user->id)->exists() && $user->active;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Categoria $categoria): bool
    {
        return Administrador::where('user_id', $user->id)->exists() && $user->active;
    }
}
