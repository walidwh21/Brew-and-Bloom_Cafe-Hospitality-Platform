@extends('admin.layouts.app')

@section('title', 'Customers')

@section('content')
    <h1 class="page-title">Customers</h1>
    <p class="page-sub">View registered customers and add loyalty bonus points.</p>

    <div class="card">
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Orders</th>
                    <th>Points</th>
                    <th>Bonus</th>
                </tr>
            </thead>
            <tbody>
                @forelse($customers as $customer)
                    <tr>
                        <td><strong>{{ $customer->name }}</strong></td>
                        <td>{{ $customer->email }}</td>
                        <td>{{ $customer->phone ?? '—' }}</td>
                        <td>{{ $customer->orders_count }}</td>
                        <td>{{ $customer->reward_points }}</td>
                        <td>
                            <form method="POST" action="/admin/customers/{{ $customer->id }}/bonus" style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
                                @csrf
                                <input type="number" name="points" value="50" min="1" max="10000" style="width:80px;padding:6px 8px">
                                <input type="text" name="description" value="Loyalty bonus" style="width:140px;padding:6px 8px">
                                <button type="submit" class="btn btn-sm btn-gold">Add</button>
                            </form>
                        </td>
                    </tr>
                @empty
                    <tr><td colspan="6" style="text-align:center;color:#999">No customers yet.</td></tr>
                @endforelse
            </tbody>
        </table>
    </div>
@endsection
