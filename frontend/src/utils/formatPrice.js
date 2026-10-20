/**
 * Format a number using the currency configured by VITE_CURRENCY (defaults to USD).
 * Used on Menu, Cart, Profile, Admin pages.
 *
 * Example: formatPrice(150) → "150"
 */
export function formatPrice(amount) {
  const value = Number(amount);
  if (Number.isNaN(value)) return '0';
  // en-US adds comma for thousands: 1,250
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: (import.meta.env.VITE_CURRENCY || 'USD').toUpperCase(),
    maximumFractionDigits: 0,
  }).format(value);
}
