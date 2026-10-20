/**
 * AJAX CLIENT (Axios)
 *
 * This file creates one shared HTTP client for all API calls.
 * It automatically attaches the login token to every request.
 */
import axios from 'axios';
import { API_BASE } from './config';
import { clearAuthSession, getToken } from '../utils/storage';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Before each request: add token if user is logged in
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If server says 401 (unauthorized), clear session and go to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAuthSession();
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
