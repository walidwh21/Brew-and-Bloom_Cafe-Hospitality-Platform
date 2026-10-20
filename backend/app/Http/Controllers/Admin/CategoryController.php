<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

/**
 * CATEGORIES ADMIN — http://localhost:8000/admin/categories
 *
 * Same simple pattern as GalleryController:
 *   index → list all
 *   create → show empty form
 *   store → save new row
 *   edit → show form with old data
 *   update → save changes
 *   destroy → delete row
 */
class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::withCount('products')->orderBy('sort_order')->get();

        return view('admin.categories.index', compact('categories'));
    }

    public function create()
    {
        return view('admin.categories.create');
    }

    public function store(Request $request)
    {
        $request->validate(['name' => 'required']);

        Category::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
            'description' => $request->description,
            'sort_order' => $request->sort_order ?? 0,
            'is_active' => $request->has('is_active'),
        ]);

        return redirect('/admin/categories')->with('success', 'Category added!');
    }

    public function edit($id)
    {
        $category = Category::findOrFail($id);

        return view('admin.categories.edit', compact('category'));
    }

    public function update(Request $request, $id)
    {
        $request->validate(['name' => 'required']);

        $category = Category::findOrFail($id);
        $category->name = $request->name;
        $category->slug = Str::slug($request->name);
        $category->description = $request->description;
        $category->sort_order = $request->sort_order ?? 0;
        $category->is_active = $request->has('is_active');
        $category->save();

        return redirect('/admin/categories')->with('success', 'Category updated!');
    }

    public function destroy($id)
    {
        Category::findOrFail($id)->delete();

        return redirect('/admin/categories')->with('success', 'Category deleted.');
    }
}
