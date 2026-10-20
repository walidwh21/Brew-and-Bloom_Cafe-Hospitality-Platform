<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactItem;
use Illuminate\Http\Request;

/**
 * CONTACT INFO — http://localhost:8000/admin/contact
 * Address, phone, email, opening hours
 */
class ContactController extends Controller
{
    public function index()
    {
        $items = ContactItem::orderBy('sort_order')->get();

        return view('admin.contact.index', compact('items'));
    }

    public function create()
    {
        return view('admin.contact.create');
    }

    public function store(Request $request)
    {
        $request->validate(['title' => 'required', 'content' => 'required']);

        ContactItem::create([
            'title' => $request->title,
            'content' => $request->content,
            'type' => $request->type,
            'sort_order' => $request->sort_order ?? 0,
            'is_active' => $request->has('is_active'),
        ]);

        return redirect('/admin/contact')->with('success', 'Contact item saved!');
    }

    public function edit($id)
    {
        $item = ContactItem::findOrFail($id);

        return view('admin.contact.edit', compact('item'));
    }

    public function update(Request $request, $id)
    {
        $request->validate(['title' => 'required', 'content' => 'required']);

        $item = ContactItem::findOrFail($id);
        $item->title = $request->title;
        $item->content = $request->content;
        $item->type = $request->type;
        $item->sort_order = $request->sort_order ?? 0;
        $item->is_active = $request->has('is_active');
        $item->save();

        return redirect('/admin/contact')->with('success', 'Contact item updated!');
    }

    public function destroy($id)
    {
        ContactItem::findOrFail($id)->delete();

        return redirect('/admin/contact')->with('success', 'Contact item deleted.');
    }
}
