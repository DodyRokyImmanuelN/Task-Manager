<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TaskController extends Controller
{
    /**
     * Tampilan task board berbasis Inertia
     */
    // app/Http/Controllers/TaskController.php
public function taskBoardByProject($id){
    $user = Auth::user();

    $tasks = Task::with(['assignee'])
        ->where('project_id', $id)
        ->get()
        ->groupBy('category');

    return Inertia::render('Tasks/Index', [
        'tasksByCategory' => $tasks,
        'projectId' => (int) $id,
    ]);
}
public function taskBoard()
{
    $user = Auth::user();

    $tasks = Task::with(['assignee'])
        ->where('assigned_to', $user->id)
        ->get()
        ->groupBy('category');

    return Inertia::render('Tasks/Index', [
        'tasksByCategory' => $tasks,
        'projectId' => null, 
    ]);
}


    /**
     * Ambil semua task dalam format JSON
     */
    public function index()
    {
        return Task::with([
            'project',
            'assignee',
            'creator',
            'checklistItems'
        ])->latest()->get();
    }

    /**
     * Simpan task baru
     */
    public function store(Request $request)
{
    $request->validate([
        'title'       => 'required|string',
        'description' => 'nullable|string',
        'project_id'  => 'required|exists:projects,id',
        'assigned_to' => 'required|exists:users,id',
        'due_date'    => 'nullable|date',
        'category'    => 'nullable|string',
    ]);

    $task = Task::create([
        'title'       => $request->title,
        'description' => $request->description,
        'status'      => 'pending',
        'project_id'  => $request->project_id,
        'assigned_to' => $request->assigned_to,
        'created_by'  => auth()->id(),
        'due_date'    => $request->due_date,
        'category'    => $request->category,
    ]);

    return response()->json([
        'message' => 'Task created successfully.',
        'task'    => $task,
    ], 201);
}
    /**
     * Tampilkan detail 1 task
     */
    public function show($id)
    {
        $task = Task::with([
            'project',
            'assignee',
            'creator',
            'checklistItems'
        ])->findOrFail($id);

        return response()->json($task);
    }

    /**
     * Update task
     */
    public function update(Request $request, $id)
    {
        $task = Task::findOrFail($id);

        $request->validate([
            'title'        => 'sometimes|required|string',
            'description'  => 'nullable|string',
            'status'       => 'nullable|string',
            'project_id'   => 'nullable|exists:projects,id',
            'assigned_to'  => 'nullable|exists:users,id',
            'due_date'     => 'nullable|date',
            'category'     => 'nullable|string',
        ]);

        $task->update($request->all());

        return response()->json([
            'message' => 'Task updated successfully.',
            'task'    => $task
        ]);
    }
    public function byProject($id)
{
    $tasks = Task::with('assignee')
        ->where('project_id', $id)
        ->get()
        ->groupBy('category');

    return Inertia::render('Tasks/Index', [
        'tasksByCategory' => $tasks,
    ]);
}
public function myTasks()
{
    $user = Auth::user();

    $tasks = Task::where('assigned_to', $user->id)->get();

    return Inertia::render('MyTasks', [
        'tasks' => $tasks,
    ]);
}

    /**
     * Hapus task
     */
    public function destroy($id)
    {
        $task = Task::findOrFail($id);
        $task->delete();

        return response()->json(['message' => 'Task deleted']);
    }
}
