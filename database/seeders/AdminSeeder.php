<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User; 

class AdminSeeder extends Seeder
{
        public function run()
    {
        

        // Buat user superadmin
        User::firstOrCreate([
            'email' => 'superadmin@idntask.com'
        ], [
            'name' => 'Super Admin',
            'password' => Hash::make('password123'), // ubah sesuai kebutuhan
            'role' => 'superadmin',
        ]);
    }
}
