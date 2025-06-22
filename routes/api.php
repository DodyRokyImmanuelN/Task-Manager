<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\ChecklistItemController;
use App\Http\Controllers\BranchController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\RoleMiddleware;
use App\Http\Controllers\GuestRequestController;

// === AUTH === //
Route::post('/register',[AuthController::class, 'register']);
Route::post('/login',[AuthController::class, 'login']);

// === GUEST REQUESTS === //
Route::post('/guest-requests', [GuestRequestController::class, 'store']);


// === PROTECTED === //
Route::middleware('auth:sanctum')->group(function () {
    // Basic auth
    Route::get('/me',[AuthController::class, 'me']);
    Route::post('/logout',[AuthController::class, 'logout']);

    // === TASK (semua user bisa melihat) === //
    Route::get('/tasks',[TaskController::class, 'index']);
    Route::get('/tasks/{id}',[TaskController::class, 'show']);

    // Hanya admin dan superadmin boleh membuat, edit, delete
    Route::middleware('role:admin,superadmin')->group(function () {
        Route::post('/tasks',[TaskController::class, 'store']);
        Route::put('/tasks/{id}',[TaskController::class, 'update']);
        Route::delete('/tasks/{id}',[TaskController::class, 'destroy']);

        // Task dispatch
        // Hanya admin dan superadmin yang boleh dispatch task
        Route::post('/tasks/{id}/dispatch', [TaskController::class, 'dispatch']);

        // === GUEST REQUESTS (hanya admin dan superadmin) === //
        Route::get('/guest-requests', [GuestRequestController::class, 'index']);
        Route::post('/guest-requests/{id}/approve', [GuestRequestController::class, 'approve']);
        Route::post('/guest-requests/{id}/reject', [GuestRequestController::class, 'reject']);
    });

    // === CHECKLIST === //
    Route::post('/tasks/{task}/checklist',[ChecklistItemController::class, 'store']);
    Route::patch('/checklist/{id}',[ChecklistItemController::class, 'toggle']);
    Route::delete('/checklist/{id}',[ChecklistItemController::class, 'destroy']);

    // === BRANCH & PROJECT === //
    Route::apiResource('branches',BranchController::class);
    Route::apiResource('projects',ProjectController::class);

    // === USER (opsional: batasi hanya superadmin) === //
    Route::middleware('role:superadmin')->group(function () {
        Route::apiResource('users',UserController::class);
    });
});