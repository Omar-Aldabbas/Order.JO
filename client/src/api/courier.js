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

export const getAvailableOrders = (params) => api.get('/courier/orders/available', { params });

export const acceptOrder = (order_id) => api.post(`/courier/orders/${order_id}/accept`);

export const completeDelivery = (order_id) => api.post(`/courier/orders/${order_id}/complete`);

export const getDeliveriesHistory = (params) => api.get('/courier/orders/history', { params });

export const getNotifications = () => api.get('/courier/notifications');

export default api;
