@extends('admin.layouts.app')
@section('title', 'Add Story Block')
@section('content')
<h1 class="page-title">Add Story Block</h1>

<div class="card form-card">
    <form method="POST" action="/admin/story">
        @csrf

        <div class="form-group">
            <label>Label *</label>
            <input type="text" name="label" required placeholder="e.g. Our Coffee">
        </div>
        <div class="form-group">
            <label>Text *</label>
            <textarea name="text" rows="4" required></textarea>
        </div>
        <div class="form-group">
            <label>Sort order</label>
            <input type="number" name="sort_order" value="0">
        </div>
        <label class="checkbox"><input type="checkbox" name="is_active" checked> Show on website</label>

        <div class="form-actions">
            <button type="submit" class="btn btn-primary">Save</button>
            <a href="/admin/story" class="btn btn-outline">Cancel</a>
        </div>
    </form>
</div>
@endsection
