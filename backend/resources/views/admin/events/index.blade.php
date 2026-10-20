@extends('admin.layouts.app')
@section('title', 'Events')
@section('content')
<div class="page-header">
    <div>
        <h1 class="page-title">Café Events</h1>
        <p class="page-sub">Live music, workshops, etc.</p>
    </div>
    <a href="/admin/events/create" class="btn btn-primary">+ Add Event</a>
</div>

<div class="table-wrap">
    <table>
        <tr><th>Title</th><th>Schedule</th><th>Actions</th></tr>
        @forelse($events as $event)
        <tr>
            <td>{{ $event->title }}</td>
            <td>{{ $event->schedule }}</td>
            <td class="actions-inline">
                <a href="/admin/events/{{ $event->id }}/edit" class="btn btn-sm btn-gold">Edit</a>
                <form method="POST" action="/admin/events/{{ $event->id }}" onsubmit="return confirm('Delete?')">
                    @csrf @method('DELETE')
                    <button class="btn btn-sm btn-danger">Delete</button>
                </form>
            </td>
        </tr>
        @empty
        <tr><td colspan="3" class="empty-state">No events yet.</td></tr>
        @endforelse
    </table>
</div>
@endsection
