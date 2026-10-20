<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\StoryPillar;
use Illuminate\Http\Request;

/**
 * STORY PILLARS — http://localhost:8000/admin/story
 * The 3 text blocks on homepage About section
 */
class StoryController extends Controller
{
    public function index()
    {
        $items = StoryPillar::orderBy('sort_order')->get();

        return view('admin.story.index', compact('items'));
    }

    public function create()
    {
        return view('admin.story.create');
    }

    public function store(Request $request)
    {
        $request->validate(['label' => 'required', 'text' => 'required']);

        StoryPillar::create([
            'label' => $request->label,
            'text' => $request->text,
            'sort_order' => $request->sort_order ?? 0,
            'is_active' => $request->has('is_active'),
        ]);

        return redirect('/admin/story')->with('success', 'Story block saved!');
    }

    public function edit($id)
    {
        $item = StoryPillar::findOrFail($id);

        return view('admin.story.edit', compact('item'));
    }

    public function update(Request $request, $id)
    {
        $request->validate(['label' => 'required', 'text' => 'required']);

        $item = StoryPillar::findOrFail($id);
        $item->label = $request->label;
        $item->text = $request->text;
        $item->sort_order = $request->sort_order ?? 0;
        $item->is_active = $request->has('is_active');
        $item->save();

        return redirect('/admin/story')->with('success', 'Story block updated!');
    }

    public function destroy($id)
    {
        StoryPillar::findOrFail($id)->delete();

        return redirect('/admin/story')->with('success', 'Story block deleted.');
    }
}
