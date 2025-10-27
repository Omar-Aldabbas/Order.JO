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

export const getTickets = (params) => api.get('/support/tickets', { params });
export const getTicket = (id) => api.get(`/support/tickets/${id}`);
export const createTicket = (data) => api.post('/support/tickets', data);
export const resolveTicket = (id) => api.post(`/support/tickets/${id}/resolve`);

export const refundOrder = (order_id) => api.post(`/support/orders/${order_id}/refund`);
export const cancelReservation = (reservation_id) => api.post(`/support/reservations/${reservation_id}/cancel`);

export default api;
