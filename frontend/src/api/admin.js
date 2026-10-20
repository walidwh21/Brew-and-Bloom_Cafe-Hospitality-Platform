/**
 * ADMIN API
 * Matches backend: routes/api/admin.php
 * Used by: pages/admin/*
 */
import api from './client';

/**
 * AJAX — Load admin dashboard stats
 *
 * Called when admin opens /admin (Dashboard.jsx).
 * Requires admin login token in header (added automatically by client.js).
 *
 * Returns: { stats: {...}, recent_orders: [...] }
 */
export async function getDashboardStats() {
  const response = await api.get('/admin/dashboard');
  return response.data.data;
}

// Categories
export async function createCategory(data) {
  const response = await api.post('/admin/categories', data);
  return response.data.data;
}

export async function updateCategory(id, data) {
  const response = await api.put(`/admin/categories/${id}`, data);
  return response.data.data;
}

export async function deleteCategory(id) {
  await api.delete(`/admin/categories/${id}`);
}

// Products
export async function createProduct(data) {
  const response = await api.post('/admin/products', data);
  return response.data.data;
}

export async function updateProduct(id, data) {
  const response = await api.put(`/admin/products/${id}`, data);
  return response.data.data;
}

export async function deleteProduct(id) {
  await api.delete(`/admin/products/${id}`);
}

// Coupons
export async function getCoupons() {
  const response = await api.get('/admin/coupons');
  return response.data.data;
}

export async function createCoupon(data) {
  const response = await api.post('/admin/coupons', data);
  return response.data.data;
}

export async function deleteCoupon(id) {
  await api.delete(`/admin/coupons/${id}`);
}

export async function updateCoupon(id, data) {
  const response = await api.put(`/admin/coupons/${id}`, data);
  return response.data.data;
}

/**
 * AJAX — Load all customers for admin table
 */
export async function getCustomers() {
  const response = await api.get('/admin/customers');
  return response.data.data.customers;
}

/** Update customer name / phone from admin panel */
export async function updateCustomer(id, data) {
  const response = await api.put(`/admin/customers/${id}`, data);
  return response.data.data.customer;
}
