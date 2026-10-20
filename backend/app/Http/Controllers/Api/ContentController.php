<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CafeEvent;
use App\Models\ContactItem;
use App\Models\GalleryItem;
use App\Models\Page;
use App\Models\SiteSetting;
use App\Models\StoryPillar;
use App\Models\Testimonial;
use Illuminate\Http\JsonResponse;

/**
 * PUBLIC CONTENT API
 * Frontend homepage & pages load website text/images from here.
 */
class ContentController extends Controller
{
    public function gallery(): JsonResponse
    {
        $items = GalleryItem::where('is_active', true)->orderBy('sort_order')->get();

        return response()->json(['data' => $items]);
    }

    public function testimonials(): JsonResponse
    {
        $items = Testimonial::where('is_active', true)->orderBy('sort_order')->get();

        return response()->json(['data' => $items]);
    }

    public function events(): JsonResponse
    {
        $items = CafeEvent::where('is_active', true)->orderBy('sort_order')->get();

        return response()->json(['data' => $items]);
    }

    public function page(string $slug): JsonResponse
    {
        $page = Page::where('slug', $slug)->where('is_active', true)->firstOrFail();

        return response()->json(['data' => $page]);
    }

    public function storyPillars(): JsonResponse
    {
        $items = StoryPillar::where('is_active', true)->orderBy('sort_order')->get();

        return response()->json(['data' => $items]);
    }

    public function contact(): JsonResponse
    {
        $items = ContactItem::where('is_active', true)->orderBy('sort_order')->get();

        return response()->json(['data' => $items]);
    }

    public function site(): JsonResponse
    {
        $settings = SiteSetting::pluck('value', 'key');

        return response()->json([
            'data' => [
                'tagline' => $settings['tagline'] ?? 'Modern Café & Hospitality',
                'short_story' => $settings['short_story'] ?? '',
            ],
        ]);
    }
}
