<?php

/**
 * PUBLIC CONTENT API — frontend loads website text/images from here.
 * File: frontend/src/api/content.js
 */

use App\Http\Controllers\Api\ContentController;
use Illuminate\Support\Facades\Route;

Route::get('/content/gallery', [ContentController::class, 'gallery']);
Route::get('/content/testimonials', [ContentController::class, 'testimonials']);
Route::get('/content/events', [ContentController::class, 'events']);
Route::get('/content/pages/{slug}', [ContentController::class, 'page']);
Route::get('/content/story-pillars', [ContentController::class, 'storyPillars']);
Route::get('/content/contact', [ContentController::class, 'contact']);
Route::get('/content/site', [ContentController::class, 'site']);
