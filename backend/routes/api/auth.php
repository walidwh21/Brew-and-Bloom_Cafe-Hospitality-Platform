<?php

/**
 * AUTH ROUTES
 * Matches frontend: Login.jsx, Register.jsx, Profile.jsx, Navbar.jsx
 */

use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;

// Public — no login required
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected — user must be logged in (send token in header)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::put('/profile', [AuthController::class, 'updateProfile']);
});
