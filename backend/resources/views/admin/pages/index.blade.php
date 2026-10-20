@extends('admin.layouts.app')
@section('title', 'About Pages')
@section('content')
<div class="page-header">
    <div>
        <h1 class="page-title">About & Our Story</h1>
        <p class="page-sub">Use slug <strong>about</strong> for homepage, <strong>our-story</strong> for About page.</p>
    </div>
    <a href="/admin/pages/create" class="btn btn-primary">+ Add Page</a>
</div>

<div class="table-wrap">
    <table>
        <tr><th>Slug</th><th>Title</th><th>Actions</th></tr>
        @forelse($pages as $page)
        <tr>
            <td>{{ $page->slug }}</td>
            <td>{{ $page->title }}</td>
            <td class="actions-inline">
                <a href="/admin/pages/{{ $page->id }}/edit" class="btn btn-sm btn-gold">Edit</a>
                <form method="POST" action="/admin/pages/{{ $page->id }}" onsubmit="return confirm('Delete this page?')">
                    @csrf @method('DELETE')
                    <button class="btn btn-sm btn-danger">Delete</button>
                </form>
            </td>
        </tr>
        @empty
        <tr><td colspan="3" class="empty-state">No pages yet.</td></tr>
        @endforelse
    </table>
</div>
@endsection
