@extends('admin.layouts.app')

@section('title', 'Add Category')

@section('content')
    <h1 class="page-title">Add Category</h1>
    <p class="page-sub">Fill the form and click Save.</p>

    <div class="card" style="max-width:560px">
        <form method="POST" action="/admin/categories">
            @csrf
            <div class="form-group">
                <label>Name *</label>
                <input type="text" name="name" value="{{ old('name') }}" required placeholder="e.g. Specialty Coffee">
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea name="description" placeholder="Short description">{{ old('description') }}</textarea>
            </div>
            <div class="form-group">
                <label>Sort Order (lower = first)</label>
                <input type="number" name="sort_order" value="{{ old('sort_order', 0) }}" min="0">
            </div>
            <label class="checkbox">
                <input type="checkbox" name="is_active" checked> Active (show on menu)
            </label>
            <div class="actions">
                <button type="submit" class="btn btn-primary">Save Category</button>
                <a href="/admin/categories" class="btn btn-gold">Cancel</a>
            </div>
        </form>
    </div>
@endsection
