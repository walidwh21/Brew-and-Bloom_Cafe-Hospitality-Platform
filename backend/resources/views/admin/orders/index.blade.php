@extends('admin.layouts.app')

@section('title', 'Orders')

@section('content')
    <h1 class="page-title">Orders</h1>
    <p class="page-sub">View and update order status.</p>

    @forelse($orders as $order)
        <div class="card">
            <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:12px">
                <div>
                    <strong>{{ $order->order_number }}</strong>
                    <span style="color:#888;margin-left:8px">{{ $order->user->name ?? 'Guest' }}</span>
                    <br><small style="color:#888">{{ $order->created_at->format('M d, Y H:i') }}</small>
                </div>
                <div style="text-align:right">
                    <strong style="font-size:20px">{{ format_money($order->total) }}</strong>
                    <form method="POST" action="/admin/orders/{{ $order->id }}/status" style="margin-top:8px">
                        @csrf @method('PATCH')
                        <select name="status" onchange="this.form.submit()" style="padding:6px;border-radius:6px">
                            @foreach(['pending','confirmed','preparing','ready','completed','cancelled'] as $s)
                                <option value="{{ $s }}" {{ ($order->status->value ?? $order->status) === $s ? 'selected' : '' }}>{{ ucfirst($s) }}</option>
                            @endforeach
                        </select>
                    </form>
                </div>
            </div>
            <ul style="font-size:14px;color:#555;padding-left:20px">
                @foreach($order->items as $item)
                    <li>{{ $item->quantity }}x {{ $item->product->name ?? 'Product' }} — {{ format_money($item->subtotal) }}</li>
                @endforeach
            </ul>
        </div>
    @empty
        <div class="card" style="text-align:center;color:#999">No orders yet.</div>
    @endforelse
@endsection
