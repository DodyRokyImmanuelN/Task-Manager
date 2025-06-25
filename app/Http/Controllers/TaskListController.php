<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TaskList;

class TaskListController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'project_id' => 'required|exists:projects,id',
        ]);

        $list = TaskList::create($validated);

        return redirect()->back()->with('success', 'List created');
    }
    public function destroy($id)
{
    $list = TaskList::findOrFail($id);
    $list->delete();

    return redirect()->back();
}
}
