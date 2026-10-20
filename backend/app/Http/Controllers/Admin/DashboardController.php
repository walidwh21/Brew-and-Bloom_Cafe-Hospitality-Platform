<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Coupon;
use App\Models\Order;
use App\Models\Product;
use App\Models\Reservation;
use App\Models\User;
use Illuminate\Support\Carbon;

/**
 * Admin home page — shows summary numbers.
 * URL: http://localhost:8000/admin
 */
class DashboardController extends Controller
{
    public function index()
    {
        $today = Carbon::today();

        $stats = [
            'total_orders' => Order::count(),
            'today_orders' => Order::whereDate('created_at', $today)->count(),
            'total_revenue' => Order::where('status', '!=', 'cancelled')->sum('total'),
            'today_revenue' => Order::whereDate('created_at', $today)->where('status', '!=', 'cancelled')->sum('total'),
            'total_products' => Product::count(),
            'total_categories' => Category::count(),
            'total_customers' => User::where('role', 'customer')->count(),
            'pending_reservations' => Reservation::where('status', 'pending')->count(),
            'active_coupons' => Coupon::where('is_active', true)->count(),
        ];

        $recentOrders = Order::with('user')->latest()->limit(8)->get();

        return view('admin.dashboard', compact('stats', 'recentOrders'));
    }
}
