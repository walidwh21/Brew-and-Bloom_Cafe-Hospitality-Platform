@extends('admin.layouts.app')
@section('title', 'Contact Info')
@section('content')
<div class="page-header">
    <div>
        <h1 class="page-title">Contact Info</h1>
        <p class="page-sub">Address, phone, email, opening hours on Contact page.</p>
    </div>
    <a href="/admin/contact/create" class="btn btn-primary">+ Add Item</a>
</div>

<div class="table-wrap">
    <table>
        <tr><th>Title</th><th>Type</th><th>Actions</th></tr>
        @forelse($items as $item)
        <tr>
            <td>{{ $item->title }}</td>
            <td>{{ $item->type }}</td>
            <td class="actions-inline">
                <a href="/admin/contact/{{ $item->id }}/edit" class="btn btn-sm btn-gold">Edit</a>
                <form method="POST" action="/admin/contact/{{ $item->id }}" onsubmit="return confirm('Delete?')">
                    @csrf @method('DELETE')
                    <button class="btn btn-sm btn-danger">Delete</button>
                </form>
            </td>
        </tr>
        @empty
        <tr><td colspan="3" class="empty-state">No contact items yet.</td></tr>
        @endforelse
    </table>
</div>
@endsection
