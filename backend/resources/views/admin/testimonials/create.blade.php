@extends('admin.layouts.app')
@section('title', 'Add Review')
@section('content')
<h1 class="page-title">Add Customer Review</h1>

<div class="card form-card">
    <form method="POST" action="/admin/testimonials">
        @csrf

        <div class="form-group">
            <label>Customer name *</label>
            <input type="text" name="name" required>
        </div>
        <div class="form-group">
            <label>Role (optional)</label>
            <input type="text" name="role" placeholder="e.g. Regular customer">
        </div>
        <div class="form-group">
            <label>Review text *</label>
            <textarea name="review" rows="4" required></textarea>
        </div>
        <div class="form-group">
            <label>Photo URL (optional)</label>
            <input type="text" name="photo" placeholder="/images/... or https://...">
        </div>
        <div class="form-group">
            <label>Rating (1–5)</label>
            <input type="number" name="rating" value="5" min="1" max="5">
        </div>
        <div class="form-group">
            <label>Sort order</label>
            <input type="number" name="sort_order" value="0">
        </div>
        <label class="checkbox"><input type="checkbox" name="is_active" checked> Show on website</label>

        <div class="form-actions">
            <button type="submit" class="btn btn-primary">Save</button>
            <a href="/admin/testimonials" class="btn btn-outline">Cancel</a>
        </div>
    </form>
</div>
@endsection
