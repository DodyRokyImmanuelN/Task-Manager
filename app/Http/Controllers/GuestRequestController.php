<?php

    namespace App\Http\Controllers;

    use App\Models\GuestRequest;
    use App\Models\Task;
    use Illuminate\Http\Request;

    class GuestRequestController extends Controller
    {
        // Guest mengisi form
        public function store(Request $request)
{
    $request->validate([
        'title' => 'required|string',
        'description' => 'nullable|string',
        'guest_name' => 'required|string',
        'guest_phone' => 'nullable|string',
    ]);

    $req = GuestRequest::create($request->all());
    return response()->json($req, 201);
}

public function approve($id, Request $request)
{
    $request->validate([
        'project_id' => 'required|exists:projects,id',
        'assigned_to' => 'required|exists:users,id',
        'category' => 'nullable|string',
    ]);

    $req = GuestRequest::findOrFail($id);

    if ($req->status !== 'pending') {
        return response()->json(['message' => 'Sudah diproses.'], 200);
    }

    $req->status = 'approved';
    $req->save();

    $task = Task::create([
        'title' => $req->title,
        'description' => $req->description,
        'project_id' => $request->project_id,
        'assigned_to' => $request->assigned_to,
        'created_by' => auth()->id(),
        'status' => 'pending',
        'category' => $request->category,
    ]);

    return response()->json(['message' => 'Approved & Task created', 'task' => $task]);
}

    }
