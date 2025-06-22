<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\Branch;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ProjectController extends Controller
{
    public function index()
    {
        return Project::with('branch')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'branch_id' => 'required|exists:branches,id'
        ]);

        return Project::create($request->only('name', 'branch_id'));
    }

    public function show($id)
    {
        return Project::with('branch')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $project = Project::findOrFail($id);
        $project->update($request->only('name', 'branch_id'));
        return $project;
    }

    public function destroy($id)
    {
        Project::destroy($id);
        return response()->json(['message' => 'Project deleted']);
    }
}
