@extends('admin.layouts.app')
@section('title', 'Edit Story Block')
@section('content')
<h1 class="page-title">Edit Story Block</h1>

<div class="card form-card">
    <form method="POST" action="/admin/story/{{ $item->id }}">
        @csrf
        @method('PUT')

        <div class="form-group">
            <label>Label *</label>
            <input type="text" name="label" value="{{ $item->label }}" required>
        </div>
        <div class="form-group">
            <label>Text *</label>
            <textarea name="text" rows="4" required>{{ $item->text }}</textarea>
        </div>
        <div class="form-group">
            <label>Sort order</label>
            <input type="number" name="sort_order" value="{{ $item->sort_order }}">
        </div>
        <label class="checkbox"><input type="checkbox" name="is_active" {{ $item->is_active ? 'checked' : '' }}> Show on website</label>

        <div class="form-actions">
            <button type="submit" class="btn btn-primary">Update</button>
            <a href="/admin/story" class="btn btn-outline">Cancel</a>
        </div>
    </form>
</div>
@endsection
