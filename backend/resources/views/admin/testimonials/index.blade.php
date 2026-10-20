@extends('admin.layouts.app')
@section('title', 'Testimonials')
@section('content')
<div class="page-header">
    <div>
        <h1 class="page-title">Customer Reviews</h1>
        <p class="page-sub">What customers say on the homepage.</p>
    </div>
    <a href="/admin/testimonials/create" class="btn btn-primary">+ Add Review</a>
</div>

<div class="table-wrap">
    <table>
        <tr><th>Name</th><th>Rating</th><th>Actions</th></tr>
        @forelse($items as $item)
        <tr>
            <td>{{ $item->name }}</td>
            <td>{{ $item->rating }} ★</td>
            <td class="actions-inline">
                <a href="/admin/testimonials/{{ $item->id }}/edit" class="btn btn-sm btn-gold">Edit</a>
                <form method="POST" action="/admin/testimonials/{{ $item->id }}" onsubmit="return confirm('Delete?')">
                    @csrf @method('DELETE')
                    <button class="btn btn-sm btn-danger">Delete</button>
                </form>
            </td>
        </tr>
        @empty
        <tr><td colspan="3" class="empty-state">No reviews yet.</td></tr>
        @endforelse
    </table>
</div>
@endsection
