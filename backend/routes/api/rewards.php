<?php

/**
 * REWARDS ROUTES
 * Matches frontend: Profile.jsx (rewards tab)
 */

use App\Http\Controllers\Api\RewardController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/rewards', [RewardController::class, 'myRewards']);
    Route::post('/rewards/redeem', [RewardController::class, 'redeem']);
});
