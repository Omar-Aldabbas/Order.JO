import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getRestaurants = () => api.get('/restaurants');
export const getMenu = (restaurant_id) => api.get(`/restaurants/${restaurant_id}/menu`);
export const updateProfile = (data) => api.put('/profile', data);
export const placeOrder = (data) => api.post('/orders', data);
export const cancelOrder = (order_id) => api.post(`/orders/${order_id}/cancel`);
export const makeReservation = (data) => api.post('/reservations', data);
export const cancelReservation = (reservation_id) => api.post(`/reservations/${reservation_id}/cancel`);
export const rateRestaurant = (order_id, data) => api.post(`/orders/${order_id}/rate`, data);
export const getOrdersHistory = () => api.get('/orders/history');
export const getNotifications = () => api.get('/notifications');

export default api;
