@extends('admin.layouts.app')

@section('title', 'Dashboard')

@section('content')
    <h1 class="page-title">Dashboard</h1>
    <p class="page-sub">Welcome! Here you can see your café at a glance.</p>

    <div class="stats">
        <div class="stat"><label>Today's Revenue</label><strong>{{ format_money($stats['today_revenue']) }}</strong></div>
        <div class="stat"><label>Total Revenue</label><strong>{{ format_money($stats['total_revenue']) }}</strong></div>
        <div class="stat"><label>Today's Orders</label><strong>{{ $stats['today_orders'] }}</strong></div>
        <div class="stat"><label>Total Orders</label><strong>{{ $stats['total_orders'] }}</strong></div>
        <div class="stat"><label>Products</label><strong>{{ $stats['total_products'] }}</strong></div>
        <div class="stat"><label>Categories</label><strong>{{ $stats['total_categories'] }}</strong></div>
        <div class="stat"><label>Customers</label><strong>{{ $stats['total_customers'] }}</strong></div>
        <div class="stat"><label>Pending Reservations</label><strong>{{ $stats['pending_reservations'] }}</strong></div>
        <div class="stat"><label>Active Coupons</label><strong>{{ $stats['active_coupons'] }}</strong></div>
    </div>

    <div class="card">
        <h2 style="font-weight:normal;margin-bottom:16px">Quick Links</h2>
        <a href="/admin/products/create" class="btn btn-primary" style="margin-right:8px">+ Add Product</a>
        <a href="/admin/categories/create" class="btn btn-gold" style="margin-right:8px">+ Add Category</a>
        <a href="/admin/coupons/create" class="btn btn-gold">+ Add Coupon</a>
    </div>

    <div class="card">
        <h2 style="font-weight:normal;margin-bottom:16px">Recent Orders</h2>
        <table>
            <thead>
                <tr>
                    <th>Order #</th>
                    <th>Customer</th>
                    <th>Status</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                @forelse($recentOrders as $order)
                    <tr>
                        <td>{{ $order->order_number }}</td>
                        <td>{{ $order->user->name ?? 'Guest' }}</td>
                        <td><span class="badge">{{ $order->status->value ?? $order->status }}</span></td>
                        <td>{{ format_money($order->total) }}</td>
                    </tr>
                @empty
                    <tr><td colspan="4" style="text-align:center;color:#999">No orders yet.</td></tr>
                @endforelse
            </tbody>
        </table>
    </div>
@endsection
