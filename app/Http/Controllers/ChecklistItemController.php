<?php

namespace App\Http\Controllers;

use App\Models\ChecklistItem;
use Illuminate\Http\Request;

class ChecklistItemController extends Controller
{
    public function store(Request $request)
{
    $validated = $request->validate([
        'task_id' => 'required|exists:tasks,id',
        'item' => 'required|string',
    ]);

    $item = ChecklistItem::create($validated);

    return response()->json($item); // <--- INI WAJIB
}

    public function index($taskId)
{
    return response()->json(
        \App\Models\ChecklistItem::where('task_id', $taskId)->get()
    );
}

    public function update(Request $request, ChecklistItem $checklistItem)
    {
        $checklistItem->update([
            'is_checked' => $request->boolean('is_checked'),
        ]);

        return response()->json($checklistItem);
    }

    public function destroy(ChecklistItem $checklistItem)
    {
        $checklistItem->delete();

        return response()->json(['success' => true]);
    }
}
