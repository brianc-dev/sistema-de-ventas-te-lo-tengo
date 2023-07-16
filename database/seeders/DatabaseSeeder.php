<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            CategoriaSeeder::class
        ]);

        DB::table('users')->insert([
            'username' => 'username1',
            'email' => 'username1@example.com',
            'password' => Hash::make('username1'),
            'active' => true
        ]);

//        DB::table('administradors')->insert([
//            'user_id' => "1"
//        ]);

        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
