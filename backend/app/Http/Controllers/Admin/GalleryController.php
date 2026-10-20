<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\GalleryItem;
use Illuminate\Http\Request;

/**
 * ============================================================
 * GALLERY ADMIN
 * Open in browser: http://localhost:8000/admin/gallery
 *
 * This file has 6 simple functions:
 *   index()   → show table of all photos
 *   create()  → show empty "add" form
 *   store()   → save new photo to database
 *   edit()    → show form with old data
 *   update()  → save changes
 *   destroy() → delete one photo
 * ============================================================
 */
class GalleryController extends Controller
{
    // Show list page
    public function index()
    {
        $photos = GalleryItem::orderBy('sort_order')->get();

        return view('admin.gallery.index', compact('photos'));
    }

    // Show add form
    public function create()
    {
        return view('admin.gallery.create');
    }

    // Save new photo (form posts here)
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'image' => 'required',
        ]);

        GalleryItem::create([
            'title' => $request->title,
            'category' => $request->category,
            'image' => $request->image,
            'size' => $request->size,
            'sort_order' => $request->sort_order ?? 0,
            'is_active' => $request->has('is_active'),
        ]);

        return redirect('/admin/gallery')->with('success', 'Photo saved!');
    }

    // Show edit form
    public function edit($id)
    {
        $photo = GalleryItem::findOrFail($id);

        return view('admin.gallery.edit', compact('photo'));
    }

    // Save edited photo
    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required',
            'image' => 'required',
        ]);

        $photo = GalleryItem::findOrFail($id);
        $photo->title = $request->title;
        $photo->category = $request->category;
        $photo->image = $request->image;
        $photo->size = $request->size;
        $photo->sort_order = $request->sort_order ?? 0;
        $photo->is_active = $request->has('is_active');
        $photo->save();

        return redirect('/admin/gallery')->with('success', 'Photo updated!');
    }

    // Delete photo
    public function destroy($id)
    {
        GalleryItem::findOrFail($id)->delete();

        return redirect('/admin/gallery')->with('success', 'Photo deleted.');
    }
}
