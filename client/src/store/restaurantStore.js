import { create } from 'zustand';
import * as restaurantApi from '../api/restaurant';

export const useRestaurantStore = create((set, get) => ({
  dashboard: {},
  orders: [],
  menu: [],
  notifications: [],
  loading: false,
  error: null,

  fetchDashboard: async () => {
    set({ loading: true, error: null });
    try {
      const res = await restaurantApi.getDashboard();
      set({ dashboard: res.data, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to fetch dashboard', loading: false });
    }
  },

  fetchMenu: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const res = await restaurantApi.getMenu(params);
      set({ menu: res.data.data, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to fetch menu', loading: false });
    }
  },

  addMenuItem: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await restaurantApi.addMenuItem(data);
      set({ menu: [...get().menu, res.data], loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to add menu item', loading: false });
    }
  },

  deleteMenuItem: async (id) => {
    set({ loading: true, error: null });
    try {
      await restaurantApi.deleteMenuItem(id);
      set({ menu: get().menu.filter(item => item.id !== id), loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to delete menu item', loading: false });
    }
  },

  updateOrderStatus: async (order_id, status) => {
    set({ loading: true, error: null });
    try {
      const res = await restaurantApi.updateOrderStatus(order_id, { status });
      set({
        orders: get().orders.map(order => order.id === order_id ? res.data : order),
        loading: false
      });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to update order', loading: false });
    }
  },

  fetchNotifications: async () => {
    set({ loading: true, error: null });
    try {
      const res = await restaurantApi.getNotifications();
      set({ notifications: res.data.data, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to fetch notifications', loading: false });
    }
  },
}));
