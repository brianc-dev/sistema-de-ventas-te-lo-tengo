<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\{Producto};

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
}
