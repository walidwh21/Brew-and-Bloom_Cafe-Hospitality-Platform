import { useEffect, useState } from 'react';
import { formatPrice } from '../../utils/formatPrice';
import { Package, FolderTree, Ticket, DollarSign, ShoppingBag, Users, Calendar, TrendingUp } from 'lucide-react';
import Card from '../../components/ui/Card';
import { getDashboardStats } from '../../api/admin';
import { getAjaxErrorMessage } from '../../utils/ajax';

/**
 * ADMIN DASHBOARD PAGE
 * URL: http://localhost:5173/admin
 *
 * How it works (step by step):
 * 1. Admin logs in → token saved in localStorage
 * 2. Admin visits /admin → this page loads
 * 3. useEffect runs once → calls getDashboardStats() (AJAX)
 * 4. Laravel returns stats + recent orders
 * 5. We save data in state → React re-renders the cards and table
 *
 * Files to read together:
 * - This file (Dashboard.jsx)
 * - frontend/src/api/admin.js          → getDashboardStats()
 * - backend/routes/api/admin.php       → GET /admin/dashboard
 * - backend/app/Http/Controllers/Api/DashboardController.php
 * - backend/app/Services/DashboardService.php
 */

// Icon for each stat card (visual only)
const statIcons = {
  total_revenue: DollarSign,
  today_revenue: TrendingUp,
  total_orders: ShoppingBag,
  total_customers: Users,
  pending_reservations: Calendar,
  total_products: Package,
  total_categories: FolderTree,
  active_coupons: Ticket,
};

// What to show on each card — key must match backend stats keys
const STAT_CARDS = [
  { key: 'today_revenue', label: "Today's Revenue", format: (v) => formatPrice(v) },
  { key: 'total_revenue', label: 'Total Revenue', format: (v) => formatPrice(v) },
  { key: 'today_orders', label: "Today's Orders" },
  { key: 'total_orders', label: 'Total Orders' },
  { key: 'total_products', label: 'Menu Products' },
  { key: 'total_categories', label: 'Categories' },
  { key: 'total_customers', label: 'Customers' },
  { key: 'pending_reservations', label: 'Pending Reservations' },
  { key: 'active_coupons', label: 'Active Coupons' },
];

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // --- AJAX CALL START ---
    // Runs automatically when page opens
    async function loadDashboard() {
      setLoading(true);
      setError('');

      try {
        const result = await getDashboardStats();
        setData(result);
      } catch (err) {
        setError(getAjaxErrorMessage(err, 'Could not load dashboard.'));
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
    // --- AJAX CALL END ---
  }, []);

  // Step 1: Show loading spinner while waiting for API
  if (loading) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
        <p className="text-sm text-espresso/60">Loading dashboard...</p>
      </div>
    );
  }

  // Step 2: Show error if AJAX failed
  if (error) {
    return (
      <div className="card-luxury text-center">
        <p className="text-burgundy">{error}</p>
        <p className="mt-2 text-sm text-espresso/60">
          Make sure you are logged in as admin and Laravel is running.
        </p>
      </div>
    );
  }

  // Step 3: Show dashboard with data from API
  return (
    <div>
      <h1 className="font-display text-3xl text-espresso">Dashboard</h1>
      <p className="text-espresso/60">Welcome to Brew & Bloom admin panel</p>

      {/* Stat cards — each reads one number from data.stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {STAT_CARDS.map((stat, i) => {
          const Icon = statIcons[stat.key] || ShoppingBag;
          const value = data.stats[stat.key];

          return (
            <Card key={stat.key} delay={i * 0.05}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-espresso/60">{stat.label}</p>
                  <p className="mt-1 font-display text-3xl text-espresso">
                    {stat.format ? stat.format(value) : value}
                  </p>
                </div>
                <div className="rounded-xl bg-gold/20 p-3">
                  <Icon className="h-6 w-6 text-gold" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent orders table */}
      <div className="mt-10">
        <h2 className="font-display text-2xl text-espresso">Recent Orders</h2>
        <p className="mt-1 text-sm text-espresso/50">Last 5 orders from the database</p>

        <div className="mt-4 overflow-x-auto rounded-2xl border border-espresso/5 bg-white/80">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-espresso/5 text-left text-espresso/60">
                <th className="p-4">Order</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {data.recent_orders?.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-espresso/40">
                    No orders yet. Orders will appear here when customers checkout.
                  </td>
                </tr>
              ) : (
                data.recent_orders?.map((order) => (
                  <tr key={order.id} className="border-b border-espresso/5 last:border-0">
                    <td className="p-4 font-medium">{order.order_number}</td>
                    <td className="p-4">{order.user?.name ?? 'Guest'}</td>
                    <td className="p-4 capitalize">{order.status}</td>
                    <td className="p-4 text-right">{formatPrice(order.total)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
