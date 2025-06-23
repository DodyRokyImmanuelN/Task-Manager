<?php
namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Project;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard', [
            'openTasks' => Task::where('status', 'open')->count(),
            'completedTasks' => Task::where('status', 'completed')->count(),
            'totalProjects' => Project::count(),
        ]);
    }
}
