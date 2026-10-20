<?php

/**
 * ADMIN ROUTES
 * Matches frontend: pages/admin/*
 * Only users with role = admin can access these.
 */

use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CouponController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ReservationController;
use App\Http\Controllers\Api\RewardController;
use App\Http\Middleware\EnsureUserIsAdmin;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum', EnsureUserIsAdmin::class])->prefix('admin')->group(function () {

    // Dashboard.jsx
    Route::get('/dashboard', [DashboardController::class, 'index']);

    // Categories.jsx
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::put('/categories/{category}', [CategoryController::class, 'update']);
    Route::delete('/categories/{category}', [CategoryController::class, 'destroy']);

    // Products.jsx
    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{product}', [ProductController::class, 'update']);
    Route::delete('/products/{product}', [ProductController::class, 'destroy']);

    // Orders.jsx
    Route::patch('/orders/{order}/status', [OrderController::class, 'updateStatus']);

    // AdminReservations.jsx
    Route::get('/reservations', [ReservationController::class, 'index']);
    Route::patch('/reservations/{reservation}/status', [ReservationController::class, 'updateStatus']);
    Route::delete('/reservations/{reservation}', [ReservationController::class, 'destroy']);

    // Coupons.jsx
    Route::get('/coupons', [CouponController::class, 'index']);
    Route::post('/coupons', [CouponController::class, 'store']);
    Route::put('/coupons/{coupon}', [CouponController::class, 'update']);
    Route::delete('/coupons/{coupon}', [CouponController::class, 'destroy']);

    // Customers.jsx
    Route::get('/customers', [DashboardController::class, 'customers']);
    Route::put('/customers/{user}', [DashboardController::class, 'updateCustomer']);
    Route::post('/rewards/{user}/bonus', [RewardController::class, 'addBonus']);
});
