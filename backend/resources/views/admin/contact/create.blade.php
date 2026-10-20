@extends('admin.layouts.app')
@section('title', 'Add Contact Item')
@section('content')
<h1 class="page-title">Add Contact Item</h1>

<div class="card form-card">
    <form method="POST" action="/admin/contact">
        @csrf

        <div class="form-group">
            <label>Title *</label>
            <input type="text" name="title" required placeholder="e.g. Address">
        </div>
        <div class="form-group">
            <label>Content *</label>
            <textarea name="content" rows="3" required></textarea>
        </div>
        <div class="form-group">
            <label>Type</label>
            <select name="type">
                <option value="address">Address</option>
                <option value="phone">Phone</option>
                <option value="email">Email</option>
                <option value="hours">Opening Hours</option>
                <option value="other">Other</option>
            </select>
        </div>
        <div class="form-group">
            <label>Sort order</label>
            <input type="number" name="sort_order" value="0">
        </div>
        <label class="checkbox"><input type="checkbox" name="is_active" checked> Show on website</label>

        <div class="form-actions">
            <button type="submit" class="btn btn-primary">Save</button>
            <a href="/admin/contact" class="btn btn-outline">Cancel</a>
        </div>
    </form>
</div>
@endsection
