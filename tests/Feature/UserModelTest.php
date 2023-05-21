<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;

class UserModelTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     */
    public function test_example(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function test_that_can_create_user(): void {
        User::create([
            'username' => 'username1',
            'email' => 'username1@example.com',
            'password' => 'username1',
            'active' => true
        ]);
        $this->assertDatabaseCount('users', 1);
        $this->assertDatabaseCount('perfils', 1);
    }
}
