<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Http\Request;

/**
 * ABOUT & OUR STORY — http://localhost:8000/admin/pages
 * Use slug "about" for homepage, "our-story" for About page
 */
class PageController extends Controller
{
    public function index()
    {
        $pages = Page::all();

        return view('admin.pages.index', compact('pages'));
    }

    public function create()
    {
        return view('admin.pages.create');
    }

    public function store(Request $request)
    {
        $request->validate(['slug' => 'required', 'title' => 'required']);

        Page::create([
            'slug' => $request->slug,
            'title' => $request->title,
            'subtitle' => $request->subtitle,
            'lead' => $request->lead,
            'body' => $request->body,
            'image_1' => $request->image_1,
            'image_2' => $request->image_2,
            'image_3' => $request->image_3,
            'is_active' => $request->has('is_active'),
        ]);

        return redirect('/admin/pages')->with('success', 'Page saved!');
    }

    public function edit($id)
    {
        $page = Page::findOrFail($id);

        return view('admin.pages.edit', compact('page'));
    }

    public function update(Request $request, $id)
    {
        $request->validate(['slug' => 'required', 'title' => 'required']);

        $page = Page::findOrFail($id);
        $page->slug = $request->slug;
        $page->title = $request->title;
        $page->subtitle = $request->subtitle;
        $page->lead = $request->lead;
        $page->body = $request->body;
        $page->image_1 = $request->image_1;
        $page->image_2 = $request->image_2;
        $page->image_3 = $request->image_3;
        $page->is_active = $request->has('is_active');
        $page->save();

        return redirect('/admin/pages')->with('success', 'Page updated!');
    }

    public function destroy($id)
    {
        Page::findOrFail($id)->delete();

        return redirect('/admin/pages')->with('success', 'Page deleted.');
    }
}
