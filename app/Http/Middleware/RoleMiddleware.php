<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Log;

class RoleMiddleware
{
   public function handle(Request $request, Closure $next, ...$roles): Response
{
    $user = $request->user();

    if (!$user || !$user->role || !in_array($user->role, $roles)) {
        return response()->json(['message' => 'Insufficient permissions'], 403);
    }

    return $next($request);
}
}