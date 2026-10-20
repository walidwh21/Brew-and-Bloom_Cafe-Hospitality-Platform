<?php

/**
 * ============================================================
 * ADMIN ROUTES — every URL written clearly (no shortcuts)
 * Login: http://localhost:8000/admin/login
 * ============================================================
 */

use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\ContactController;
use App\Http\Controllers\Admin\CouponController;
use App\Http\Controllers\Admin\CustomerController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\EventController;
use App\Http\Controllers\Admin\GalleryController;
use App\Http\Controllers\Admin\LoginController;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\PageController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\ReservationController;
use App\Http\Controllers\Admin\StoryController;
use App\Http\Controllers\Admin\TestimonialController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect('/admin/login');
});

Route::get('/login', function () {
    return redirect('/admin/login');
});

// ---------- LOGIN (no password needed to view login page) ----------
Route::get('/admin/login', [LoginController::class, 'show']);
Route::post('/admin/login', [LoginController::class, 'login']);
Route::post('/admin/logout', [LoginController::class, 'logout']);

// ---------- PAGES THAT NEED LOGIN ----------
Route::middleware(['auth', 'admin.web'])->group(function () {

    Route::get('/admin', [DashboardController::class, 'index']);

    // CATEGORIES
    Route::get('/admin/categories', [CategoryController::class, 'index']);
    Route::get('/admin/categories/create', [CategoryController::class, 'create']);
    Route::post('/admin/categories', [CategoryController::class, 'store']);
    Route::get('/admin/categories/{id}/edit', [CategoryController::class, 'edit']);
    Route::put('/admin/categories/{id}', [CategoryController::class, 'update']);
    Route::delete('/admin/categories/{id}', [CategoryController::class, 'destroy']);

    // PRODUCTS
    Route::get('/admin/products', [ProductController::class, 'index']);
    Route::get('/admin/products/create', [ProductController::class, 'create']);
    Route::post('/admin/products', [ProductController::class, 'store']);
    Route::get('/admin/products/{id}/edit', [ProductController::class, 'edit']);
    Route::put('/admin/products/{id}', [ProductController::class, 'update']);
    Route::delete('/admin/products/{id}', [ProductController::class, 'destroy']);

    // COUPONS
    Route::get('/admin/coupons', [CouponController::class, 'index']);
    Route::get('/admin/coupons/create', [CouponController::class, 'create']);
    Route::post('/admin/coupons', [CouponController::class, 'store']);
    Route::get('/admin/coupons/{id}/edit', [CouponController::class, 'edit']);
    Route::put('/admin/coupons/{id}', [CouponController::class, 'update']);
    Route::delete('/admin/coupons/{id}', [CouponController::class, 'destroy']);

    // ORDERS
    Route::get('/admin/orders', [OrderController::class, 'index']);
    Route::patch('/admin/orders/{id}/status', [OrderController::class, 'updateStatus']);

    // RESERVATIONS
    Route::get('/admin/reservations', [ReservationController::class, 'index']);
    Route::patch('/admin/reservations/{id}/status', [ReservationController::class, 'updateStatus']);
    Route::delete('/admin/reservations/{id}', [ReservationController::class, 'destroy']);

    // CUSTOMERS
    Route::get('/admin/customers', [CustomerController::class, 'index']);
    Route::post('/admin/customers/{id}/bonus', [CustomerController::class, 'addBonus']);

    // GALLERY
    Route::get('/admin/gallery', [GalleryController::class, 'index']);
    Route::get('/admin/gallery/create', [GalleryController::class, 'create']);
    Route::post('/admin/gallery', [GalleryController::class, 'store']);
    Route::get('/admin/gallery/{id}/edit', [GalleryController::class, 'edit']);
    Route::put('/admin/gallery/{id}', [GalleryController::class, 'update']);
    Route::delete('/admin/gallery/{id}', [GalleryController::class, 'destroy']);

    // TESTIMONIALS
    Route::get('/admin/testimonials', [TestimonialController::class, 'index']);
    Route::get('/admin/testimonials/create', [TestimonialController::class, 'create']);
    Route::post('/admin/testimonials', [TestimonialController::class, 'store']);
    Route::get('/admin/testimonials/{id}/edit', [TestimonialController::class, 'edit']);
    Route::put('/admin/testimonials/{id}', [TestimonialController::class, 'update']);
    Route::delete('/admin/testimonials/{id}', [TestimonialController::class, 'destroy']);

    // EVENTS
    Route::get('/admin/events', [EventController::class, 'index']);
    Route::get('/admin/events/create', [EventController::class, 'create']);
    Route::post('/admin/events', [EventController::class, 'store']);
    Route::get('/admin/events/{id}/edit', [EventController::class, 'edit']);
    Route::put('/admin/events/{id}', [EventController::class, 'update']);
    Route::delete('/admin/events/{id}', [EventController::class, 'destroy']);

    // ABOUT & OUR STORY (pages table)
    Route::get('/admin/pages', [PageController::class, 'index']);
    Route::get('/admin/pages/create', [PageController::class, 'create']);
    Route::post('/admin/pages', [PageController::class, 'store']);
    Route::get('/admin/pages/{id}/edit', [PageController::class, 'edit']);
    Route::put('/admin/pages/{id}', [PageController::class, 'update']);
    Route::delete('/admin/pages/{id}', [PageController::class, 'destroy']);

    // STORY PILLARS (homepage about blocks)
    Route::get('/admin/story', [StoryController::class, 'index']);
    Route::get('/admin/story/create', [StoryController::class, 'create']);
    Route::post('/admin/story', [StoryController::class, 'store']);
    Route::get('/admin/story/{id}/edit', [StoryController::class, 'edit']);
    Route::put('/admin/story/{id}', [StoryController::class, 'update']);
    Route::delete('/admin/story/{id}', [StoryController::class, 'destroy']);

    // CONTACT
    Route::get('/admin/contact', [ContactController::class, 'index']);
    Route::get('/admin/contact/create', [ContactController::class, 'create']);
    Route::post('/admin/contact', [ContactController::class, 'store']);
    Route::get('/admin/contact/{id}/edit', [ContactController::class, 'edit']);
    Route::put('/admin/contact/{id}', [ContactController::class, 'update']);
    Route::delete('/admin/contact/{id}', [ContactController::class, 'destroy']);
});
