<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Branch;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;

class BranchController extends Controller
{
      public function index()
    {
        return Branch::all();
    }

    public function store(Request $request)
    {
        $request->validate(['name' => 'required|string|unique:branches']);
        return Branch::create($request->only('name'));
    }

    public function show($id)
    {
        return Branch::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $branch = Branch::findOrFail($id);
        $branch->update($request->only('name'));
        return $branch;
    }

    public function destroy($id)
    {
        Branch::destroy($id);
        return response()->json(['message' => 'Branch deleted']);
    }
}
