@extends('admin.layouts.app')

@section('title', 'Edit Category')

@section('content')
    <h1 class="page-title">Edit Category</h1>

    <div class="card" style="max-width:560px">
        <form method="POST" action="/admin/categories/{{ $category->id }}">
            @csrf @method('PUT')
            <div class="form-group">
                <label>Name *</label>
                <input type="text" name="name" value="{{ old('name', $category->name) }}" required>
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea name="description">{{ old('description', $category->description) }}</textarea>
            </div>
            <div class="form-group">
                <label>Sort Order</label>
                <input type="number" name="sort_order" value="{{ old('sort_order', $category->sort_order) }}" min="0">
            </div>
            <label class="checkbox">
                <input type="checkbox" name="is_active" {{ $category->is_active ? 'checked' : '' }}> Active
            </label>
            <div class="actions">
                <button type="submit" class="btn btn-primary">Update</button>
                <a href="/admin/categories" class="btn btn-gold">Cancel</a>
            </div>
        </form>
    </div>
@endsection
