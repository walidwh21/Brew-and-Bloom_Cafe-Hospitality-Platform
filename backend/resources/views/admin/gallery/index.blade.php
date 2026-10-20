@extends('admin.layouts.app')
@section('title', 'Gallery')
@section('content')
<div class="page-header">
    <div>
        <h1 class="page-title">Gallery</h1>
        <p class="page-sub">Photos on the website homepage and gallery page.</p>
    </div>
    <a href="/admin/gallery/create" class="btn btn-primary">+ Add Photo</a>
</div>

<div class="table-wrap">
    <table>
        <tr><th>Title</th><th>Category</th><th>Actions</th></tr>
        @forelse($photos as $photo)
        <tr>
            <td>{{ $photo->title }}</td>
            <td>{{ $photo->category }}</td>
            <td class="actions-inline">
                <a href="/admin/gallery/{{ $photo->id }}/edit" class="btn btn-sm btn-gold">Edit</a>
                <form method="POST" action="/admin/gallery/{{ $photo->id }}" onsubmit="return confirm('Delete?')">
                    @csrf @method('DELETE')
                    <button class="btn btn-sm btn-danger">Delete</button>
                </form>
            </td>
        </tr>
        @empty
        <tr><td colspan="3" class="empty-state">No photos yet. Click + Add Photo.</td></tr>
        @endforelse
    </table>
</div>
@endsection
