/**
 * COUPON API (public + admin)
 * Matches backend: routes/api/orders.php
 * Used by: SpecialOffersSection.jsx, Cart.jsx, admin/Coupons.jsx
 */
import api from './client';

/** Homepage — load active offers from database */
export async function getActiveCoupons() {
  const response = await api.get('/coupons/active');
  return response.data.data;
}

/** Cart — check if a coupon code is valid */
export async function validateCouponCode(code, subtotal) {
  const response = await api.post('/coupons/validate', { code, subtotal });
  return response.data;
}
