<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Protects the web admin panel.
 * Only logged-in users with role = admin can pass through.
 */
class AdminWebMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        if (! $request->user() || ! $request->user()->isAdmin()) {
            return redirect()
                ->route('admin.login')
                ->with('error', 'Please log in with an admin account.');
        }

        return $next($request);
    }
}
