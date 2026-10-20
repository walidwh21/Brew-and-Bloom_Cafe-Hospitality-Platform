@extends('admin.layouts.app')

@section('title', 'Categories')

@section('content')
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px">
        <div>
            <h1 class="page-title">Categories</h1>
            <p class="page-sub">Organize your menu (e.g. Coffee, Pastries, Brunch)</p>
        </div>
        <a href="/admin/categories/create" class="btn btn-primary">+ Add Category</a>
    </div>

    <div class="card">
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Products</th>
                    <th>Sort</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                @forelse($categories as $category)
                    <tr>
                        <td><strong>{{ $category->name }}</strong><br><small style="color:#888">{{ $category->description }}</small></td>
                        <td>{{ $category->products_count }}</td>
                        <td>{{ $category->sort_order }}</td>
                        <td>{{ $category->is_active ? 'Active' : 'Hidden' }}</td>
                        <td>
                            <a href="/admin/categories/{{ $category->id }}/edit" class="btn btn-sm btn-gold">Edit</a>
                            <form action="/admin/categories/{{ $category->id }}" method="POST" style="display:inline" onsubmit="return confirm('Delete this category?')">
                                @csrf @method('DELETE')
                                <button type="submit" class="btn btn-sm btn-danger">Delete</button>
                            </form>
                        </td>
                    </tr>
                @empty
                    <tr><td colspan="5" style="text-align:center;color:#999">No categories yet. Click "Add Category" above.</td></tr>
                @endforelse
            </tbody>
        </table>
    </div>
@endsection
