import { create } from 'zustand';
import * as userApi from '../api/user';

export const useUserStore = create((set) => ({
  restaurants: [],
  menu: [],
  orders: [],
  notifications: [],
  loading: false,
  error: null,

  fetchRestaurants: async () => {
    set({ loading: true, error: null });
    try {
      const res = await userApi.getRestaurants();
      set({ restaurants: res.data, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to fetch restaurants', loading: false });
    }
  },

  fetchMenu: async (restaurant_id) => {
    set({ loading: true, error: null });
    try {
      const res = await userApi.getMenu(restaurant_id);
      set({ menu: res.data.data, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to fetch menu', loading: false });
    }
  },

  placeOrder: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await userApi.placeOrder(data);
      set({ orders: [...get().orders, res.data], loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to place order', loading: false });
    }
  },

  fetchOrdersHistory: async () => {
    set({ loading: true, error: null });
    try {
      const res = await userApi.getOrdersHistory();
      set({ orders: res.data.data, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to fetch order history', loading: false });
    }
  },

  fetchNotifications: async () => {
    set({ loading: true, error: null });
    try {
      const res = await userApi.getNotifications();
      set({ notifications: res.data.notifications.data, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to fetch notifications', loading: false });
    }
  },
}));
