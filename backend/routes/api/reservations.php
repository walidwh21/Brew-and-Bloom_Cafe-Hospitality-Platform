<?php

/**
 * RESERVATION ROUTES
 * Matches frontend: Reservations.jsx
 */

use App\Http\Controllers\Api\ReservationController;
use Illuminate\Support\Facades\Route;

// Public — guests can book a table without an account
Route::post('/reservations', [ReservationController::class, 'store']);

// Protected — logged-in users can see their bookings
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/reservations', [ReservationController::class, 'index']);
    Route::get('/reservations/{reservation}', [ReservationController::class, 'show']);
});
