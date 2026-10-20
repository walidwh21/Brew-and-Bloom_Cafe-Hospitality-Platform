<?php

/**
 * ORDER ROUTES
 * Matches frontend: Cart.jsx, Profile.jsx (orders tab)
 */

use App\Http\Controllers\Api\CouponController;
use App\Http\Controllers\Api\OrderController;
use Illuminate\Support\Facades\Route;

// Public — validate coupon before checkout
Route::post('/coupons/validate', [CouponController::class, 'validateCode']);

// Public — homepage loads active offers from database
Route::get('/coupons/active', [CouponController::class, 'active']);

// Protected — must be logged in to place/view orders
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders/{order}', [OrderController::class, 'show']);
});
