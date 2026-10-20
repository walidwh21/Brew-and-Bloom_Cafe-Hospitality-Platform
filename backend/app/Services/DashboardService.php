<?php

namespace App\Services;

use App\Models\Category;
use App\Models\Coupon;
use App\Models\Order;
use App\Models\Product;
use App\Models\Reservation;
use App\Models\User;
use Illuminate\Support\Carbon;

/**
 * Dashboard statistics — used by admin Dashboard.jsx
 *
 * Each method here counts rows from the database.
 * Beginners: think of this as "SQL queries written in PHP".
 */
class DashboardService
{
    public function stats(): array
    {
        $today = Carbon::today();

        return [
            // How many orders exist in total
            'total_orders' => Order::count(),

            // Orders placed today only
            'today_orders' => Order::whereDate('created_at', $today)->count(),

            // Sum of all order totals (skip cancelled)
            'total_revenue' => (float) Order::where('status', '!=', 'cancelled')->sum('total'),

            // Revenue earned today
            'today_revenue' => (float) Order::whereDate('created_at', $today)
                ->where('status', '!=', 'cancelled')
                ->sum('total'),

            // Count users with role = customer
            'total_customers' => User::where('role', 'customer')->count(),

            // Reservations waiting for admin approval
            'pending_reservations' => Reservation::where('status', 'pending')->count(),

            'total_products' => Product::count(),
            'total_categories' => Category::count(),
            'active_coupons' => Coupon::where('is_active', true)->count(),

            // Last 5 orders for the table on dashboard
            'recent_orders' => Order::with('user')
                ->latest()
                ->limit(5)
                ->get(),
        ];
    }
}
