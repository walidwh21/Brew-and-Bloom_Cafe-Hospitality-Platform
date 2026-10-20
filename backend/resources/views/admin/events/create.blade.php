@extends('admin.layouts.app')
@section('title', 'Add Event')
@section('content')
<h1 class="page-title">Add Event</h1>

<div class="card form-card">
    <form method="POST" action="/admin/events">
        @csrf

        <div class="form-group">
            <label>Title *</label>
            <input type="text" name="title" required>
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea name="description" rows="3"></textarea>
        </div>
        <div class="form-group">
            <label>Schedule</label>
            <input type="text" name="schedule" placeholder="e.g. Every Friday 7 PM">
        </div>
        <div class="form-group">
            <label>Image URL</label>
            <input type="text" name="image" placeholder="/images/... or https://...">
        </div>
        <div class="form-group">
            <label>Icon</label>
            <select name="icon">
                <option value="music">Music</option>
                <option value="coffee">Coffee</option>
                <option value="star">Star</option>
            </select>
        </div>
        <div class="form-group">
            <label>Sort order</label>
            <input type="number" name="sort_order" value="0">
        </div>
        <label class="checkbox"><input type="checkbox" name="is_active" checked> Show on website</label>

        <div class="form-actions">
            <button type="submit" class="btn btn-primary">Save</button>
            <a href="/admin/events" class="btn btn-outline">Cancel</a>
        </div>
    </form>
</div>
@endsection
