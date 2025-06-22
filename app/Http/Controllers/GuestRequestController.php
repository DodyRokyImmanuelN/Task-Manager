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
            'branch_id' => 'required|exists:branches,id',
            'guest_name' => 'required|string',
            'guest_phone' => 'nullable|string',
        ]);

        $req = GuestRequest::create($request->all());
        return response()->json($req, 201);
    }

    // Admin melihat semua permintaan
    public function index()
    {
        return GuestRequest::with('branch')->latest()->get();
    }

    // Admin menyetujui permintaan → jadi task
    public function approve($id, Request $request)
    {
        $req = GuestRequest::findOrFail($id);

        if ($req->status !== 'pending') {
            return response()->json(['message' => 'Sudah diproses.'], 400);
        }

        $req->status = 'approved';
        $req->save();

        // Buat task dari request
        $task = Task::create([
            'title' => $req->title,
            'description' => $req->description,
            'project_id' => $request->project_id,  // dikirim dari admin
            'assigned_to' => $request->assigned_to,
            'created_by' => auth()->id(),
            'branch_id' => $req->branch_id,
            'from_branch_id' => null,
            'status' => 'pending'
        ]);

        return response()->json(['message' => 'Approved & Task created', 'task' => $task]);
    }

    // Admin menolak
    public function reject($id)
    {
        $req = GuestRequest::findOrFail($id);
        $req->status = 'rejected';
        $req->save();

        return response()->json(['message' => 'Rejected']);
    }
}
