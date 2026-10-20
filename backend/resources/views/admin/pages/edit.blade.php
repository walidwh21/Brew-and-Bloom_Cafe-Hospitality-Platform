@extends('admin.layouts.app')
@section('title', 'Edit Page')
@section('content')
<h1 class="page-title">Edit Page</h1>

<div class="card form-card">
    <form method="POST" action="/admin/pages/{{ $page->id }}">
        @csrf
        @method('PUT')

        <div class="form-group">
            <label>Slug *</label>
            <input type="text" name="slug" value="{{ $page->slug }}" required>
        </div>
        <div class="form-group">
            <label>Title *</label>
            <input type="text" name="title" value="{{ $page->title }}" required>
        </div>
        <div class="form-group">
            <label>Subtitle</label>
            <input type="text" name="subtitle" value="{{ $page->subtitle }}">
        </div>
        <div class="form-group">
            <label>Lead paragraph</label>
            <textarea name="lead" rows="3">{{ $page->lead }}</textarea>
        </div>
        <div class="form-group">
            <label>Body text</label>
            <textarea name="body" rows="6">{{ $page->body }}</textarea>
        </div>
        <div class="form-group">
            <label>Image 1 URL</label>
            <input type="text" name="image_1" value="{{ $page->image_1 }}">
        </div>
        <div class="form-group">
            <label>Image 2 URL</label>
            <input type="text" name="image_2" value="{{ $page->image_2 }}">
        </div>
        <div class="form-group">
            <label>Image 3 URL</label>
            <input type="text" name="image_3" value="{{ $page->image_3 }}">
        </div>
        <label class="checkbox"><input type="checkbox" name="is_active" {{ $page->is_active ? 'checked' : '' }}> Show on website</label>

        <div class="form-actions">
            <button type="submit" class="btn btn-primary">Update</button>
            <a href="/admin/pages" class="btn btn-outline">Cancel</a>
        </div>
    </form>
</div>
@endsection
