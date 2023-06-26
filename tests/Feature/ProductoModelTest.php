<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\{Producto, User, Administrador};

class ProductoModelTest extends TestCase
{

    use RefreshDatabase;
    
    public function test_that_can_create_producto(): void
    {
        $producto = Producto::create([
            'codigo' => '7702111227934',
            'nombre' => 'Cuaderno',
            'cantidad' => 12,
            'precio' => '1.5',
            'gravado' => true
        ]);

        $this->assertDatabaseCount('productos', 1);
        $this->assertDatabaseHas('productos', [
            'codigo' => $producto->codigo
        ]);
    }

    public function test_that_producto_returns_form_as_admin(): void {

        // $this->withoutExceptionHandling();

        $user = User::create([
            'username' => 'admin',
            'email' => 'admin@example.com',
            'password' => 'admin',
            'active' => true
        ]);
        
        $admin = Administrador::create([
            'user_id' => $user->id
        ]);

        $response = $this->actingAs($user)->get('/productos/create');

        $response->assertStatus(200);
    }

    public function test_that_producto_does_not_return_form_as_guest(): void {
        $response = $this->get('/productos/create');

        $response->assertRedirect('/login');
    }

    public function test_that_producto_does_not_return_form_as_customer(): void {
        $user = User::create([
            'username' => 'username1',
            'email' => 'username1@example.com',
            'password' => 'username1=',
            'active' => true
        ]);

        $response = $this->actingAs($user)->get('/productos/create');

        $response->assertForbidden();
        
    }
}
