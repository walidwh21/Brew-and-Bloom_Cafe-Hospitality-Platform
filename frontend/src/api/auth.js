/**
 * AUTH API
 * Matches backend: routes/api/auth.php
 * Used by: Login.jsx, Register.jsx, Profile.jsx, Navbar.jsx
 */
import api from './client';

/**
 * AJAX Login — POST /api/login
 * @param {string} email
 * @param {string} password
 * @returns {{ user, token, message }}
 */
export async function loginUser(email, password) {
  const response = await api.post('/login', { email, password });
  return {
    message: response.data.message,
    user: response.data.data.user,
    token: response.data.data.token,
  };
}

/**
 * AJAX Register — POST /api/register
 */
export async function registerUser(formData) {
  const response = await api.post('/register', formData);
  return {
    message: response.data.message,
    user: response.data.data.user,
    token: response.data.data.token,
  };
}

/**
 * AJAX Logout — POST /api/logout
 */
export async function logoutUser() {
  const response = await api.post('/logout');
  return response.data.message;
}

/**
 * AJAX Get current user — GET /api/me
 * Called on page refresh to restore login session
 */
export async function fetchCurrentUser() {
  const response = await api.get('/me');
  return response.data.data.user;
}

/**
 * AJAX Update profile — PUT /api/profile
 */
export async function updateProfile(formData) {
  const response = await api.put('/profile', formData);
  return response.data.data.user;
}
