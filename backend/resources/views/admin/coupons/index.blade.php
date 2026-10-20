@extends('admin.layouts.app')

@section('title', 'Coupons')

@section('content')
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px">
        <div>
            <h1 class="page-title">Coupons</h1>
            <p class="page-sub">Discount codes for customers.</p>
        </div>
        <a href="/admin/coupons/create" class="btn btn-primary">+ Add Coupon</a>
    </div>

    <div class="card">
        <table>
            <thead>
                <tr>
                    <th>Code</th>
                    <th>Discount</th>
                    <th>Min Order</th>
                    <th>Used</th>
                    <th>Active</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                @forelse($coupons as $coupon)
                    <tr>
                        <td><strong>{{ $coupon->code }}</strong><br><small>{{ $coupon->description }}</small></td>
                        <td>
                            @if(($coupon->type->value ?? $coupon->type) === 'percentage')
                                {{ $coupon->value }}%
                            @else
                                {{ format_money($coupon->value) }}
                            @endif
                        </td>
                        <td>{{ format_money($coupon->min_order) }}</td>
                        <td>{{ $coupon->used_count }}{{ $coupon->max_uses ? '/'.$coupon->max_uses : '' }}</td>
                        <td>{{ $coupon->is_active ? 'Yes' : 'No' }}</td>
                        <td>
                            <a href="/admin/coupons/{{ $coupon->id }}/edit" class="btn btn-sm btn-gold">Edit</a>
                            <form action="/admin/coupons/{{ $coupon->id }}" method="POST" style="display:inline" onsubmit="return confirm('Delete coupon?')">
                                @csrf @method('DELETE')
                                <button type="submit" class="btn btn-sm btn-danger">Delete</button>
                            </form>
                        </td>
                    </tr>
                @empty
                    <tr><td colspan="6" style="text-align:center;color:#999">No coupons yet.</td></tr>
                @endforelse
            </tbody>
        </table>
    </div>
@endsection
