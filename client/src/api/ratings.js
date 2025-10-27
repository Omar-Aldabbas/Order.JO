import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const rateOrder = (order_id, data) => api.post(`/ratings/${order_id}`, data);

export const getRestaurantRatings = (restaurant_id, params = {}) =>
  api.get(`/ratings/restaurant/${restaurant_id}`, { params });

export default api;
