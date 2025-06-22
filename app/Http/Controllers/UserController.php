<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
     public function index()
    {
        return User::with('branch')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'        => 'required|string',
            'email'       => 'required|email|unique:users',
            'password'    => 'required|string|min:6',
            'role'        => 'required|in:superadmin,admin,monitor,user',
            'branch_id'   => 'nullable|exists:branches,id',
            'phone_number'=> 'nullable|string',
        ]);

        return User::create([
            'name'        => $request->name,
            'email'       => $request->email,
            'password'    => Hash::make($request->password),
            'role'        => $request->role,
            'branch_id'   => $request->branch_id,
            'phone_number'=> $request->phone_number,
        ]);
    }

    public function show($id)
    {
        return User::with('branch')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $data = $request->validate([
            'name'        => 'nullable|string',
            'email'       => 'nullable|email|unique:users,email,'.$id,
            'password'    => 'nullable|string|min:6',
            'role'        => 'nullable|in:superadmin,admin,monitor,user',
            'branch_id'   => 'nullable|exists:branches,id',
            'phone_number'=> 'nullable|string',
        ]);

        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

        $user->update($data);

        return $user;
    }

    public function destroy($id)
    {
        User::destroy($id);
        return response()->json(['message' => 'User deleted']);
    }
}
