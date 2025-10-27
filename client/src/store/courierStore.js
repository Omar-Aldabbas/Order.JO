import { create } from 'zustand';
import * as courierApi from '../api/courier';

export const useCourierStore = create((set, get) => ({
  availableOrders: [],
  deliveries: [],
  notifications: [],
  loading: false,
  error: null,

  fetchAvailableOrders: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const res = await courierApi.getAvailableOrders(params);
      set({ availableOrders: res.data.data, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to fetch available orders', loading: false });
    }
  },

  acceptOrder: async (order_id) => {
    set({ loading: true, error: null });
    try {
      const res = await courierApi.acceptOrder(order_id);
      set({
        availableOrders: get().availableOrders.filter(order => order.id !== order_id),
        deliveries: [...get().deliveries, res.data],
        loading: false
      });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to accept order', loading: false });
    }
  },

  completeDelivery: async (order_id) => {
    set({ loading: true, error: null });
    try {
      const res = await courierApi.completeDelivery(order_id);
      set({
        deliveries: get().deliveries.map(delivery =>
          delivery.id === order_id ? res.data.order : delivery
        ),
        loading: false
      });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to complete delivery', loading: false });
    }
  },

  fetchDeliveriesHistory: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const res = await courierApi.getDeliveriesHistory(params);
      set({ deliveries: res.data.data, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to fetch deliveries history', loading: false });
    }
  },

  fetchNotifications: async () => {
    set({ loading: true, error: null });
    try {
      const res = await courierApi.getNotifications();
      set({ notifications: res.data.data, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to fetch notifications', loading: false });
    }
  },
}));
