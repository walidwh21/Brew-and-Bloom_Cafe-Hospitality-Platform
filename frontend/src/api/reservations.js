/**
 * RESERVATION API
 * Matches backend: routes/api/reservations.php
 * Used by: Reservations.jsx, admin/AdminReservations.jsx
 */
import api from './client';

export async function getReservations(params = {}) {
  const response = await api.get('/reservations', { params });
  return response.data.data;
}

export async function createReservation(formData) {
  const response = await api.post('/reservations', formData);
  return response.data.data;
}

export async function updateReservationStatus(id, status) {
  const response = await api.patch(`/admin/reservations/${id}/status`, { status });
  return response.data.data;
}

export async function deleteReservation(id) {
  await api.delete(`/admin/reservations/${id}`);
}
