@extends('admin.layouts.app')
@section('title', 'Edit Contact Item')
@section('content')
<h1 class="page-title">Edit Contact Item</h1>

<div class="card form-card">
    <form method="POST" action="/admin/contact/{{ $item->id }}">
        @csrf
        @method('PUT')

        <div class="form-group">
            <label>Title *</label>
            <input type="text" name="title" value="{{ $item->title }}" required>
        </div>
        <div class="form-group">
            <label>Content *</label>
            <textarea name="content" rows="3" required>{{ $item->content }}</textarea>
        </div>
        <div class="form-group">
            <label>Type</label>
            <select name="type">
                @foreach(['address','phone','email','hours','other'] as $type)
                    <option value="{{ $type }}" {{ $item->type == $type ? 'selected' : '' }}>{{ ucfirst($type) }}</option>
                @endforeach
            </select>
        </div>
        <div class="form-group">
            <label>Sort order</label>
            <input type="number" name="sort_order" value="{{ $item->sort_order }}">
        </div>
        <label class="checkbox"><input type="checkbox" name="is_active" {{ $item->is_active ? 'checked' : '' }}> Show on website</label>

        <div class="form-actions">
            <button type="submit" class="btn btn-primary">Update</button>
            <a href="/admin/contact" class="btn btn-outline">Cancel</a>
        </div>
    </form>
</div>
@endsection
