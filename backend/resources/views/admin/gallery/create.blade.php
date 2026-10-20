@extends('admin.layouts.app')
@section('title', 'Add Gallery Photo')
@section('content')
<h1 class="page-title">Add Gallery Photo</h1>

<div class="card form-card">
    {{-- Form sends data to GalleryController@store --}}
    <form method="POST" action="/admin/gallery">
        @csrf

        <div class="form-group">
            <label>Title *</label>
            <input type="text" name="title" required>
        </div>
        <div class="form-group">
            <label>Category</label>
            <select name="category">
                <option>Coffee Shots</option>
                <option>Interior</option>
                <option>Food</option>
                <option>Events</option>
            </select>
        </div>
        <div class="form-group">
            <label>Image URL *</label>
            <input type="text" name="image" required placeholder="/images/... or https://...">
        </div>
        <div class="form-group">
            <label>Size</label>
            <select name="size">
                <option value="short">Short</option>
                <option value="medium" selected>Medium</option>
                <option value="tall">Tall</option>
            </select>
        </div>
        <div class="form-group">
            <label>Sort order</label>
            <input type="number" name="sort_order" value="0">
        </div>
        <label class="checkbox"><input type="checkbox" name="is_active" checked> Show on website</label>

        <div class="form-actions">
            <button type="submit" class="btn btn-primary">Save</button>
            <a href="/admin/gallery" class="btn btn-outline">Cancel</a>
        </div>
    </form>
</div>
@endsection
