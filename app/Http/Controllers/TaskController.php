<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    // Tampilkan semua task dengan relasi penting
    public function index()
    {
        return Task::with([
            'project',
            'branch',
            'fromBranch',
            'assignee',
            'creator',
            'checklistItems'
        ])->latest()->get();
    }

    // Buat task baru
    public function store(Request $request)
    {
        $request->validate([
            'title'         => 'required|string',
            'description'   => 'nullable|string',
            'project_id'    => 'required|exists:projects,id',
            'assigned_to'   => 'required|exists:users,id',
            'branch_id'     => 'required|exists:branches,id',
            'from_branch_id'=> 'nullable|exists:branches,id',
            'due_date'      => 'nullable|date'
        ]);

        $task = Task::create([
            'title'         => $request->title,
            'description'   => $request->description,
            'status'        => 'pending',
            'project_id'    => $request->project_id,
            'assigned_to'   => $request->assigned_to,
            'created_by'    => auth()->id(),
            'branch_id'     => $request->branch_id,
            'from_branch_id'=> $request->from_branch_id,
            'due_date'      => $request->due_date,
        ]);

        // TODO: Tambah WhatsApp notifikasi jika dibutuhkan

        return response()->json([
            'message' => 'Task created successfully.',
            'task'    => $task
        ], 201);
    }

    // Detail satu task (dengan checklist)
    public function show($id)
    {
        $task = Task::with([
            'project',
            'branch',
            'fromBranch',
            'assignee',
            'creator',
            'checklistItems'
        ])->findOrFail($id);

        return response()->json($task);
    }

    // Update task
    public function update(Request $request, $id)
    {
        $task = Task::findOrFail($id);

        $request->validate([
            'title'         => 'sometimes|required|string',
            'description'   => 'nullable|string',
            'status'        => 'nullable|string',
            'project_id'    => 'nullable|exists:projects,id',
            'assigned_to'   => 'nullable|exists:users,id',
            'branch_id'     => 'nullable|exists:branches,id',
            'from_branch_id'=> 'nullable|exists:branches,id',
            'due_date'      => 'nullable|date'
        ]);

        $task->update($request->all());

        return response()->json([
            'message' => 'Task updated successfully.',
            'task'    => $task
        ]);
    }

    // Hapus task
    public function destroy($id)
    {
        $task = Task::findOrFail($id);
        $task->delete();

        return response()->json(['message' => 'Task deleted']);
    }

    // Dispatch task ke branch lain
    public function dispatch(Request $request, $id)
    {
        $task = Task::findOrFail($id);

        $request->validate([
            'target_branch_id' => 'required|exists:branches,id',
        ]);

        $task->from_branch_id = $task->branch_id;
        $task->branch_id = $request->target_branch_id;
        $task->dispatched_at = now();
        $task->save();

        return response()->json([
            'message' => 'Task dispatched successfully.',
            'task' => $task
        ]);
    }
}
