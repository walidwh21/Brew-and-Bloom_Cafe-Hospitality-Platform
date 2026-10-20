@extends('admin.layouts.app')
@section('title', 'Edit Gallery Photo')
@section('content')
<h1 class="page-title">Edit Gallery Photo</h1>

<div class="card form-card">
    <form method="POST" action="/admin/gallery/{{ $photo->id }}">
        @csrf
        @method('PUT')

        <div class="form-group">
            <label>Title *</label>
            <input type="text" name="title" value="{{ $photo->title }}" required>
        </div>
        <div class="form-group">
            <label>Category</label>
            <select name="category">
                @foreach(['Coffee Shots','Interior','Food','Events'] as $cat)
                    <option {{ $photo->category == $cat ? 'selected' : '' }}>{{ $cat }}</option>
                @endforeach
            </select>
        </div>
        <div class="form-group">
            <label>Image URL *</label>
            <input type="text" name="image" value="{{ $photo->image }}" required>
        </div>
        <div class="form-group">
            <label>Size</label>
            <select name="size">
                <option value="short" {{ $photo->size == 'short' ? 'selected' : '' }}>Short</option>
                <option value="medium" {{ $photo->size == 'medium' ? 'selected' : '' }}>Medium</option>
                <option value="tall" {{ $photo->size == 'tall' ? 'selected' : '' }}>Tall</option>
            </select>
        </div>
        <div class="form-group">
            <label>Sort order</label>
            <input type="number" name="sort_order" value="{{ $photo->sort_order }}">
        </div>
        <label class="checkbox"><input type="checkbox" name="is_active" {{ $photo->is_active ? 'checked' : '' }}> Show on website</label>

        <div class="form-actions">
            <button type="submit" class="btn btn-primary">Update</button>
            <a href="/admin/gallery" class="btn btn-outline">Cancel</a>
        </div>
    </form>
</div>
@endsection
