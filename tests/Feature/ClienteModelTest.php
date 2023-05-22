<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use App\Models\Cliente;
use App\Models\User;
use Tests\TestCase;

class ClienteModelTest extends TestCase
{
    use RefreshDatabase;
    
    public function test_that_cliente_can_be_created(): void {
        $user = User::create([
            'username' => 'username1',
            'email' => 'username1@example.com',
            'password' => '123456',
            'active' => true
        ]);

        Cliente::create([
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
    }
}
