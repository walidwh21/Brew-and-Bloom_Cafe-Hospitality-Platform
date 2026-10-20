<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CafeEvent;
use Illuminate\Http\Request;

/**
 * EVENTS ADMIN — http://localhost:8000/admin/events
 */
class EventController extends Controller
{
    public function index()
    {
        $events = CafeEvent::orderBy('sort_order')->get();

        return view('admin.events.index', compact('events'));
    }

    public function create()
    {
        return view('admin.events.create');
    }

    public function store(Request $request)
    {
        $request->validate(['title' => 'required']);

        CafeEvent::create([
            'title' => $request->title,
            'description' => $request->description,
            'schedule' => $request->schedule,
            'image' => $request->image,
            'icon' => $request->icon ?? 'music',
            'sort_order' => $request->sort_order ?? 0,
            'is_active' => $request->has('is_active'),
        ]);

        return redirect('/admin/events')->with('success', 'Event saved!');
    }

    public function edit($id)
    {
        $event = CafeEvent::findOrFail($id);

        return view('admin.events.edit', compact('event'));
    }

    public function update(Request $request, $id)
    {
        $request->validate(['title' => 'required']);

        $event = CafeEvent::findOrFail($id);
        $event->title = $request->title;
        $event->description = $request->description;
        $event->schedule = $request->schedule;
        $event->image = $request->image;
        $event->icon = $request->icon ?? 'music';
        $event->sort_order = $request->sort_order ?? 0;
        $event->is_active = $request->has('is_active');
        $event->save();

        return redirect('/admin/events')->with('success', 'Event updated!');
    }

    public function destroy($id)
    {
        CafeEvent::findOrFail($id)->delete();

        return redirect('/admin/events')->with('success', 'Event deleted.');
    }
}
