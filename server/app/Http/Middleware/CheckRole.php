<?php

namespace app\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckRole
{
    public function handle(Request $request, Closure $next, $role)
    {
        $user = Auth::user();

        if (!$user || $user->role !== $role) {
            return response()->json([
                'message' => 'Unauthorized. You need the '.$role.' role.'
            ], 403);
        }

        return $next($request);
    }
}
