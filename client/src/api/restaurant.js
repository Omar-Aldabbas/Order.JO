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

export const getDashboard = () => api.get('/restaurant/dashboard');

export const updateOrderStatus = (order_id, data) => api.put(`/restaurant/orders/${order_id}/status`, data);

export const addMenuItem = (data) => api.post('/restaurant/menu', data);
export const deleteMenuItem = (id) => api.delete(`/restaurant/menu/${id}`);
export const getMenu = (params) => api.get('/restaurant/menu', { params });

export const getNotifications = () => api.get('/restaurant/notifications');

export default api;
