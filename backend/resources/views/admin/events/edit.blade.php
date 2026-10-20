@extends('admin.layouts.app')
@section('title', 'Edit Event')
@section('content')
<h1 class="page-title">Edit Event</h1>

<div class="card form-card">
    <form method="POST" action="/admin/events/{{ $event->id }}">
        @csrf
        @method('PUT')

        <div class="form-group">
            <label>Title *</label>
            <input type="text" name="title" value="{{ $event->title }}" required>
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea name="description" rows="3">{{ $event->description }}</textarea>
        </div>
        <div class="form-group">
            <label>Schedule</label>
            <input type="text" name="schedule" value="{{ $event->schedule }}">
        </div>
        <div class="form-group">
            <label>Image URL</label>
            <input type="text" name="image" value="{{ $event->image }}">
        </div>
        <div class="form-group">
            <label>Icon</label>
            <select name="icon">
                <option value="music" {{ $event->icon == 'music' ? 'selected' : '' }}>Music</option>
                <option value="coffee" {{ $event->icon == 'coffee' ? 'selected' : '' }}>Coffee</option>
                <option value="star" {{ $event->icon == 'star' ? 'selected' : '' }}>Star</option>
            </select>
        </div>
        <div class="form-group">
            <label>Sort order</label>
            <input type="number" name="sort_order" value="{{ $event->sort_order }}">
        </div>
        <label class="checkbox"><input type="checkbox" name="is_active" {{ $event->is_active ? 'checked' : '' }}> Show on website</label>

        <div class="form-actions">
            <button type="submit" class="btn btn-primary">Update</button>
            <a href="/admin/events" class="btn btn-outline">Cancel</a>
        </div>
    </form>
</div>
@endsection
