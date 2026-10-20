@extends('admin.layouts.app')
@section('title', 'Add Page')
@section('content')
<h1 class="page-title">Add Page</h1>

<div class="card form-card">
    <form method="POST" action="/admin/pages">
        @csrf

        <div class="form-group">
            <label>Slug * (no spaces)</label>
            <input type="text" name="slug" required placeholder="about or our-story">
        </div>
        <div class="form-group">
            <label>Title *</label>
            <input type="text" name="title" required>
        </div>
        <div class="form-group">
            <label>Subtitle</label>
            <input type="text" name="subtitle">
        </div>
        <div class="form-group">
            <label>Lead paragraph</label>
            <textarea name="lead" rows="3"></textarea>
        </div>
        <div class="form-group">
            <label>Body text</label>
            <textarea name="body" rows="6"></textarea>
        </div>
        <div class="form-group">
            <label>Image 1 URL</label>
            <input type="text" name="image_1">
        </div>
        <div class="form-group">
            <label>Image 2 URL</label>
            <input type="text" name="image_2">
        </div>
        <div class="form-group">
            <label>Image 3 URL</label>
            <input type="text" name="image_3">
        </div>
        <label class="checkbox"><input type="checkbox" name="is_active" checked> Show on website</label>

        <div class="form-actions">
            <button type="submit" class="btn btn-primary">Save</button>
            <a href="/admin/pages" class="btn btn-outline">Cancel</a>
        </div>
    </form>
</div>
@endsection
