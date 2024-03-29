<?php

namespace App\Policies;

use App\Models\Administrador;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class AdministradorPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        $admin = Administrador::Where('user_id', $user->id)->first();
        return $admin != null && $user->active;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Administrador $administrador): bool
    {
        $admin = Administrador::Where('user_id', $user->id)->first();
        return $admin != null && $user->active;
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
    public function update(User $user, Administrador $administrador): bool
    {
        $admin = Administrador::Where('user_id', $user->id)->first();
        return $admin != null && $user->active;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Administrador $administrador): bool
    {
        $admin = Administrador::Where('user_id', $user->id)->first();
        return $admin != null && $user->active;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Administrador $administrador): bool
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Administrador $administrador): bool
    {
        //
    }
}
