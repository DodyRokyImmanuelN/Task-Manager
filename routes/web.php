<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminTaskController;
use App\Http\Controllers\UserTaskController;
use App\Http\Controllers\MonitorController;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    //role
    Route::get('/admin/tasks', [AdminTaskController::class, 'index'])->name('admin.tasks');
    Route::get('/user/tasks', [UserTaskController::class, 'index'])->name('user.tasks');
    Route::get('/monitor/view', [MonitorController::class, 'index'])->name('monitor.view');
});

require __DIR__.'/auth.php';
