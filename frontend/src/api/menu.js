/**
 * MENU API
 * Matches backend: routes/api/menu.php
 * Used by: Home.jsx, Menu.jsx
 */
import api from './client';

export async function getCategories(params = {}) {
  const response = await api.get('/categories', { params });
  return response.data.data;
}

export async function getProducts(params = {}) {
  const response = await api.get('/products', { params });
  return response.data.data;
}
