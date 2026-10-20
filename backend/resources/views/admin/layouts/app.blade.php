<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Admin') — Brew & Bloom</title>
    <link rel="stylesheet" href="{{ asset('css/admin.css') }}">
</head>
<body>
    <aside class="admin-sidebar">
        <div class="admin-brand">
            <small>Admin Panel</small>
            <a href="/admin" class="admin-brand-logo">
                <img src="{{ asset('images/logo-mark.svg') }}" alt="Brew & Bloom" class="admin-brand-mark">
            </a>
        </div>

        {{-- Simple links: each href is the exact URL you type in the browser --}}
        <nav class="admin-nav">
            <p class="nav-group-label">Overview</p>
            <a href="/admin" class="{{ request()->is('admin') && !request()->is('admin/*') ? 'active' : '' }}">Dashboard</a>

            <p class="nav-group-label">Menu</p>
            <a href="/admin/categories" class="{{ request()->is('admin/categories*') ? 'active' : '' }}">Categories</a>
            <a href="/admin/products" class="{{ request()->is('admin/products*') ? 'active' : '' }}">Products</a>
            <a href="/admin/coupons" class="{{ request()->is('admin/coupons*') ? 'active' : '' }}">Coupons</a>

            <p class="nav-group-label">Operations</p>
            <a href="/admin/orders" class="{{ request()->is('admin/orders*') ? 'active' : '' }}">Orders</a>
            <a href="/admin/reservations" class="{{ request()->is('admin/reservations*') ? 'active' : '' }}">Reservations</a>
            <a href="/admin/customers" class="{{ request()->is('admin/customers*') ? 'active' : '' }}">Customers</a>

            <p class="nav-group-label">Website Content</p>
            <a href="/admin/gallery" class="{{ request()->is('admin/gallery*') ? 'active' : '' }}">Gallery</a>
            <a href="/admin/testimonials" class="{{ request()->is('admin/testimonials*') ? 'active' : '' }}">Testimonials</a>
            <a href="/admin/events" class="{{ request()->is('admin/events*') ? 'active' : '' }}">Events</a>
            <a href="/admin/pages" class="{{ request()->is('admin/pages*') ? 'active' : '' }}">About & Story</a>
            <a href="/admin/story" class="{{ request()->is('admin/story*') ? 'active' : '' }}">Story Pillars</a>
            <a href="/admin/contact" class="{{ request()->is('admin/contact*') ? 'active' : '' }}">Contact</a>
        </nav>

        <div class="admin-sidebar-footer">
            <div class="admin-user-name">{{ auth()->user()->name ?? 'Admin' }}</div>
            <form action="/admin/logout" method="POST">
                @csrf
                <button type="submit" class="btn btn-sm btn-gold" style="width:100%">Logout</button>
            </form>
        </div>
    </aside>

    <div class="admin-main">
        <header class="admin-topbar">
            <span class="admin-topbar-title">Brew & Bloom Café</span>
            <a href="http://localhost:5173" target="_blank" class="btn btn-sm btn-outline">View Website ↗</a>
        </header>

        <main class="admin-content">
            @if(session('success'))
                <div class="alert alert-success">✓ {{ session('success') }}</div>
            @endif
            @if(session('error'))
                <div class="alert alert-error">{{ session('error') }}</div>
            @endif
            @if($errors->any())
                <div class="alert alert-error">
                    @foreach($errors->all() as $error)
                        <div>{{ $error }}</div>
                    @endforeach
                </div>
            @endif

            @yield('content')
        </main>
    </div>
</body>
</html>
