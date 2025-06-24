<?php
namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Project;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
{
    $today = Carbon::now();

    // 7 hari terakhir
    $weeklyData = collect([]);
    for ($i = 6; $i >= 0; $i--) {
        $day = $today->copy()->subDays($i)->format('D');
        $count = Task::whereDate('created_at', $today->copy()->subDays($i)->toDateString())
                    ->where('status', 'completed')
                    ->count();
        $weeklyData->push(['day' => $day, 'tasks' => $count]);
    }

    // Data bulanan
    $monthlyData = collect([]);
    for ($i = 1; $i <= 12; $i++) {
        $count = Task::whereMonth('created_at', $i)
                     ->whereYear('created_at', $today->year)
                     ->where('status', 'completed')
                     ->count();
        $monthlyData->push([
            'month' => Carbon::create()->month($i)->format('M'),
            'tasks' => $count,
        ]);
    }

    return Inertia::render('Dashboard', [
        'openTasks' => Task::where('status', 'open')->count(),
        'completedTasks' => Task::where('status', 'completed')->count(),
        'totalProjects' => \App\Models\Project::count(),
        'weeklyData' => $weeklyData,
        'monthlyData' => $monthlyData,
    ]);
}
}
