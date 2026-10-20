/**
 * REWARDS API
 * Matches backend: routes/api/rewards.php
 * Used by: Profile.jsx, admin/Customers.jsx
 */
import api from './client';

export async function getMyRewards() {
  const response = await api.get('/rewards');
  return response.data;
}

export async function redeemPoints(points, description = 'Points redeemed') {
  const response = await api.post('/rewards/redeem', { points, description });
  return response.data.user;
}

export async function addBonusPoints(userId, points, description) {
  const response = await api.post(`/admin/rewards/${userId}/bonus`, { points, description });
  return response.data.user;
}
