<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

/**
 * Base controller for all API responses.
 * Every endpoint returns the same JSON shape so the React frontend is easy to read.
 *
 * Success: { "success": true,  "message": "...", "data": { ... } }
 * Error:   { "success": false, "message": "...", "errors": { ... } }
 */
class BaseApiController extends Controller
{
    protected function success(string $message, mixed $data = null, int $status = 200): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data,
        ], $status);
    }

    protected function error(string $message, mixed $errors = null, int $status = 422): JsonResponse
    {
        return response()->json([
            'success' => false,
            'message' => $message,
            'errors' => $errors,
        ], $status);
    }
}
