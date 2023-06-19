<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use App\Models\{User, Cliente};
use Tests\TestCase;

class CarteraModelTest extends TestCase
{

    use RefreshDatabase;

    /**
     * A basic feature test example.
     */
    public function test_that_cartera_is_created_with_cliente(): void
    {
        $user = User::create([
            'username' => 'username1',
            'email' => 'username1@example.com',
            'password' => '123456',
            'active' => true
        ]);

        $cliente = Cliente::create([
            'cedula' => '12345678',
            'nombre' => 'Merry',
            'apellido' => 'Murray',
            'telefono' => '2451245',
            'user_id' => $user->id
        ]);

        $this->assertDatabaseCount('carteras', 1);
        $this->assertDatabaseHas('carteras', [
            'cliente_id' => $cliente->id
        ]);
    }
}
