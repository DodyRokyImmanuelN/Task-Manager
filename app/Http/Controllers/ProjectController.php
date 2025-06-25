<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\Task;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        return Project::all(); // Tidak perlu 'with(branch)' lagi
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        Project::create([
            'name' => $validated['name'],
            'color' => fake()->hexColor(),
        ]);

        return redirect()->back()->with('success', 'Project created');
    }

    public function show($id)
{
    $project = Project::findOrFail($id);

    $taskLists = $project->taskLists()->with('tasks.assignee')->get();

    return Inertia::render('Tasks/Index', [
        'project'    => $project,
        'projectId'  => $project->id,
        'taskLists'  => $taskLists,
    ]);
}


    public function update(Request $request, $id)
    {
        $project = Project::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'color' => 'nullable|string',
        ]);

        $project->update($validated);

        return response()->json([
            'message' => 'Project updated',
            'data' => $project
        ]);
    }

    public function destroy($id)
    {
        $project = Project::findOrFail($id);
        $project->delete();

        return response()->json(['message' => 'Project deleted']);
    }
}
