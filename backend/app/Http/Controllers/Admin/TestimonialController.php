<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;

/**
 * TESTIMONIALS ADMIN — http://localhost:8000/admin/testimonials
 * Same 6 functions as GalleryController: index, create, store, edit, update, destroy
 */
class TestimonialController extends Controller
{
    public function index()
    {
        $items = Testimonial::orderBy('sort_order')->get();

        return view('admin.testimonials.index', compact('items'));
    }

    public function create()
    {
        return view('admin.testimonials.create');
    }

    public function store(Request $request)
    {
        $request->validate(['name' => 'required', 'review' => 'required']);

        Testimonial::create([
            'name' => $request->name,
            'role' => $request->role,
            'review' => $request->review,
            'photo' => $request->photo,
            'rating' => $request->rating ?? 5,
            'sort_order' => $request->sort_order ?? 0,
            'is_active' => $request->has('is_active'),
        ]);

        return redirect('/admin/testimonials')->with('success', 'Review saved!');
    }

    public function edit($id)
    {
        $item = Testimonial::findOrFail($id);

        return view('admin.testimonials.edit', compact('item'));
    }

    public function update(Request $request, $id)
    {
        $request->validate(['name' => 'required', 'review' => 'required']);

        $item = Testimonial::findOrFail($id);
        $item->name = $request->name;
        $item->role = $request->role;
        $item->review = $request->review;
        $item->photo = $request->photo;
        $item->rating = $request->rating ?? 5;
        $item->sort_order = $request->sort_order ?? 0;
        $item->is_active = $request->has('is_active');
        $item->save();

        return redirect('/admin/testimonials')->with('success', 'Review updated!');
    }

    public function destroy($id)
    {
        Testimonial::findOrFail($id)->delete();

        return redirect('/admin/testimonials')->with('success', 'Review deleted.');
    }
}
