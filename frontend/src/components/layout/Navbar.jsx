import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { logoutUser } from '../../api/auth';
import { NAV_LINKS } from '../../config/site';
import Logo from '../brand/Logo';

function NavItem({ to, label, isDark, onClick }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`nav-link ${isDark ? 'nav-link-dark' : 'nav-link-light'} ${isActive ? 'nav-link-active' : ''}`}
    >
      {label}
    </Link>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAdmin, clearUser } = useAuth();
  const { itemCount } = useCart();
  const location = useLocation();

  const isHome = location.pathname === '/';
  const isOverHero = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch {
      // ignore
    }
    clearUser();
    setOpen(false);
  };

  return (
    <header
      className={`navbar sticky top-0 z-50 transition-all duration-500 ${
        isOverHero
          ? 'navbar-transparent'
          : isHome
            ? 'navbar-glass-dark'
            : 'navbar-glass-light'
      }`}
    >
      <div className="navbar-grid mx-auto max-w-7xl px-4 py-3 md:px-8 md:py-4">
        <div className="navbar-logo-slot justify-self-start">
          <Logo size="header" />
        </div>

        {/* Center — Navigation (desktop) */}
        <nav className="hidden items-center justify-center gap-6 lg:flex xl:gap-8">
          {NAV_LINKS.map((link) => (
            <NavItem key={link.to} {...link} isDark={isOverHero || (isHome && scrolled)} />
          ))}
        </nav>

        {/* Right — Cart + Reservation */}
        <div className="flex items-center justify-end gap-2 sm:gap-3">
          <Link
            to="/cart"
            className={`navbar-icon-btn ${isOverHero || (isHome && scrolled) ? 'navbar-icon-dark' : 'navbar-icon-light'}`}
            aria-label="Cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] font-semibold text-espresso">
                {itemCount}
              </span>
            )}
          </Link>

          <Link
            to="/reservations"
            className={`navbar-reserve-btn hidden sm:inline-flex ${isOverHero ? 'navbar-reserve-hero' : 'navbar-reserve-default'}`}
          >
            Reservation
          </Link>

          <button
            type="button"
            className={`rounded-lg p-2 lg:hidden ${isOverHero || (isHome && scrolled) ? 'text-cream' : 'text-espresso'}`}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-white/10 bg-espresso/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="nav-mobile-link"
                >
                  {link.label}
                </Link>
              ))}

              <Link to="/reservations" className="btn-gold mt-4 w-full text-center sm:hidden">
                Reservation
              </Link>

              <div className="mt-6 border-t border-white/10 pt-4">
                {user ? (
                  <div className="flex flex-col gap-3 text-sm text-cream/80">
                    <Link to="/profile" className="flex items-center gap-2 hover:text-gold">
                      <User className="h-4 w-4" />
                      {user.name}
                    </Link>
                    {isAdmin && (
                      <Link to="/admin" className="hover:text-gold">Admin Dashboard</Link>
                    )}
                    <button type="button" onClick={handleLogout} className="text-left hover:text-gold">
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link to="/login" className="btn-gold w-full text-center">
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
