@extends('admin.layouts.app')
@section('title', 'Story Pillars')
@section('content')
<div class="page-header">
    <div>
        <h1 class="page-title">Story Pillars</h1>
        <p class="page-sub">The 3 text blocks on the homepage About section.</p>
    </div>
    <a href="/admin/story/create" class="btn btn-primary">+ Add Block</a>
</div>

<div class="table-wrap">
    <table>
        <tr><th>Label</th><th>Text</th><th>Actions</th></tr>
        @forelse($items as $item)
        <tr>
            <td>{{ $item->label }}</td>
            <td>{{ Str::limit($item->text, 60) }}</td>
            <td class="actions-inline">
                <a href="/admin/story/{{ $item->id }}/edit" class="btn btn-sm btn-gold">Edit</a>
                <form method="POST" action="/admin/story/{{ $item->id }}" onsubmit="return confirm('Delete?')">
                    @csrf @method('DELETE')
                    <button class="btn btn-sm btn-danger">Delete</button>
                </form>
            </td>
        </tr>
        @empty
        <tr><td colspan="3" class="empty-state">No story blocks yet.</td></tr>
        @endforelse
    </table>
</div>
@endsection
