/**
 * ADMIN LAYOUT
 * URL: /admin/*
 *
 * Wraps all admin pages with a sidebar.
 * The main content area uses <Outlet /> — React Router swaps
 * Dashboard, Products, Orders, etc. inside this layout.
 *
 * Beginners: App.jsx routes /admin to this layout,
 * then child routes load pages from pages/admin/
 */
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  FolderOpen,
  ShoppingCart,
  Calendar,
  Ticket,
  Users,
  ArrowLeft,
  Menu,
} from 'lucide-react';
import Logo from '../../components/brand/Logo';
import { useAuth } from '../../context/AuthContext';

// Sidebar links — each "to" matches a route in App.jsx
const sidebarLinks = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/admin/products', icon: Package, label: 'Products' },
  { to: '/admin/categories', icon: FolderOpen, label: 'Categories' },
  { to: '/admin/orders', icon: ShoppingCart, label: 'Orders' },
  { to: '/admin/reservations', icon: Calendar, label: 'Reservations' },
  { to: '/admin/coupons', icon: Ticket, label: 'Coupons' },
  { to: '/admin/customers', icon: Users, label: 'Customers' },
];

export default function AdminLayout() {
  const location = useLocation();
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-cream-dark">
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-espresso/50 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-espresso/10 bg-espresso text-cream transition-transform md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="border-b border-cream/10 p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Admin Panel</p>
          <div className="mt-3">
            <Logo size="md" link={false} className="items-start" />
          </div>
          <p className="mt-3 text-xs text-cream/50">{user?.name}</p>
        </div>

        <nav className="space-y-1 p-4">
          {sidebarLinks.map((link) => {
            const isActive = link.end
              ? location.pathname === link.to
              : location.pathname.startsWith(link.to);
            const Icon = link.icon;

            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all ${
                  isActive
                    ? 'bg-gold/20 text-gold'
                    : 'text-cream/70 hover:bg-cream/5 hover:text-cream'
                }`}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 border-t border-cream/10 p-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-cream/60 hover:text-gold"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Café
          </Link>
        </div>
      </aside>

      <div className="flex flex-1 flex-col md:ml-64">
        <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-espresso/10 bg-cream/90 px-4 py-3 backdrop-blur md:hidden">
          <button onClick={() => setSidebarOpen(true)} className="rounded-lg p-2 hover:bg-espresso/5">
            <Menu className="h-6 w-6" />
          </button>
          <span className="font-display text-lg">Admin Panel</span>
        </header>

        {/* Child page renders here (Dashboard, Products, etc.) */}
        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
