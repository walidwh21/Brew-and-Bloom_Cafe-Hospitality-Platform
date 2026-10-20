@extends('admin.layouts.app')

@section('title', 'Reservations')

@section('content')
    <h1 class="page-title">Reservations</h1>
    <p class="page-sub">Table booking requests from customers.</p>

    <div class="card">
        <table>
            <thead>
                <tr>
                    <th>Guest</th>
                    <th>Date & Time</th>
                    <th>Guests</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                @forelse($reservations as $r)
                    <tr>
                        <td>
                            <strong>{{ $r->name }}</strong><br>
                            <small>{{ $r->email }} · {{ $r->phone }}</small>
                        </td>
                        <td>{{ $r->reservation_date->format('Y-m-d') }} at {{ $r->reservation_time }}</td>
                        <td>{{ $r->guests }}</td>
                        <td>
                            <form method="POST" action="/admin/reservations/{{ $r->id }}/status">
                                @csrf @method('PATCH')
                                <select name="status" onchange="this.form.submit()" style="padding:4px;border-radius:4px">
                                    @foreach(['pending','confirmed','cancelled','completed'] as $s)
                                        <option value="{{ $s }}" {{ ($r->status->value ?? $r->status) === $s ? 'selected' : '' }}>{{ ucfirst($s) }}</option>
                                    @endforeach
                                </select>
                            </form>
                        </td>
                        <td>
                            <form action="/admin/reservations/{{ $r->id }}" method="POST" onsubmit="return confirm('Delete?')">
                                @csrf @method('DELETE')
                                <button type="submit" class="btn btn-sm btn-danger">Delete</button>
                            </form>
                        </td>
                    </tr>
                @empty
                    <tr><td colspan="5" style="text-align:center;color:#999">No reservations yet.</td></tr>
                @endforelse
            </tbody>
        </table>
    </div>
@endsection
