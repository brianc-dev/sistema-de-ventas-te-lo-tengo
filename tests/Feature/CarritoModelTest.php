<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use App\Models\Carrito;
use App\Models\Cliente;
use App\Models\User;
use Tests\TestCase;

class CarritoModelTest extends TestCase
{
    use RefreshDatabase;

    public function test_that_carrito_is_created_with_cliente(): void {
        $user = User::create([
            'username' => 'username1',
            'email' => 'username1@example.com',
            'password' => '123456',
            'active' => true
        ]);

        $this->assertDatabaseCount('users', 1);
        $this->assertDatabaseHas('users', [
            'username' => 'username1'
        ]);

        $cliente = Cliente::create([
            'cedula' => '12345678',
            'nombre' => 'Merry',
            'apellido' => 'Murray',
            'telefono' => '2451245',
            'user_id' => $user->id
        ]);

        $this->assertDatabaseCount('clientes', 1);
        $this->assertDatabaseHas('clientes', [
            'cedula' => '12345678'
        ]);

        $this->assertDatabaseCount('carritos', 1);
        $this->assertDatabaseHas('carritos', [
            'cliente_id' => $cliente->id
        ]);
    }

    // public function test_that_carrito_can_add_producto(): void {
    //     Producto::create([
    //         'codigo' => '7702111227934',
    //         'nombre' => 'Cuaderno',
    //         'cantidad' => 12,
    //         'precio' => 1.0,
    //         'gravado' => false
    //     ]);

    //     $this->assertDatabaseHas('productos', [
    //         'producto' => 'Cuaderno'
    //     ]);
    // }
}
