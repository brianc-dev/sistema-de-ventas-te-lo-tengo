<?php

namespace App\Policies;

use App\Models\{User, Producto, Administrador};
use Illuminate\Auth\Access\Response;

class ProductoPolicy
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
    public function view(?User $user, Producto $producto): bool
    {
        return true;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        $admin = Administrador::Where('user_id', $user->id)->first();
        return $admin != null && $user->active;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Producto $producto): bool
    {
        $admin = Administrador::Where('user_id', $user->id)->first();
        return $admin != null && $user->active;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Producto $producto): bool
    {
        $admin = Administrador::Where('user_id', $user->id)->first();
        return $admin != null && $user->active;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Producto $producto): bool
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Producto $producto): bool
    {
        //
    }
}
