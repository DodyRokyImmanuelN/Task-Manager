<?php

namespace App\Http\Controllers;

use App\Models\ChecklistItem;
use App\Models\Task;
use Illuminate\Http\Request;

class ChecklistItemController extends Controller
{
    public function store(Request $request, $taskId)
    {
        $task = Task::findOrFail($taskId);

        $item = $task->checklistItems()->create([
            'content' => $request->content,
        ]);

        return response()->json($item, 201);
    }

    public function toggle($id)
    {
        $item = ChecklistItem::findOrFail($id);
        $item->is_completed = !$item->is_completed;
        $item->save();

        return response()->json($item);
    }

    public function destroy($id)
    {
        $item = ChecklistItem::findOrFail($id);
        $item->delete();

        return response()->json(['message' => 'Checklist item deleted']);
    }
}