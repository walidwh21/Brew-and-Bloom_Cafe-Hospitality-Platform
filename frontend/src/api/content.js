/**
 * WEBSITE CONTENT API
 *
 * Each function = one AJAX call to Laravel.
 * Edit content in Blade admin: http://localhost:8000/admin
 */
import api from './client';

export async function getGalleryItems() {
  const response = await api.get('/content/gallery');
  return response.data.data;
}

export async function getTestimonials() {
  const response = await api.get('/content/testimonials');
  return response.data.data;
}

export async function getCafeEvents() {
  const response = await api.get('/content/events');
  return response.data.data;
}

export async function getStoryPillars() {
  const response = await api.get('/content/story-pillars');
  return response.data.data;
}

export async function getContactItems() {
  const response = await api.get('/content/contact');
  return response.data.data;
}

export async function getSiteContent() {
  const response = await api.get('/content/site');
  return response.data.data;
}

export async function getPage(slug) {
  const response = await api.get(`/content/pages/${slug}`);
  return response.data.data;
}
