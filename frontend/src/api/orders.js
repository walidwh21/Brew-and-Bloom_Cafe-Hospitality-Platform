/**
 * ORDER API
 * Matches backend: routes/api/orders.php
 * Used by: Cart.jsx, Profile.jsx, admin/Orders.jsx
 */
import api from './client';

export async function getOrders(params = {}) {
  const response = await api.get('/orders', { params });
  return response.data.data;
}

export async function placeOrder(orderData) {
  const response = await api.post('/orders', orderData);
  return response.data.data;
}

export async function updateOrderStatus(orderId, status) {
  const response = await api.patch(`/admin/orders/${orderId}/status`, { status });
  return response.data.data;
}

export async function validateCoupon(code, subtotal) {
  const response = await api.post('/coupons/validate', { code, subtotal });
  return response.data;
}
