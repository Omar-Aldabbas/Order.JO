import { create } from 'zustand';
import * as ratingApi from '../api/ratings';

export const useRatingStore = create((set, get) => ({
  restaurantRatings: [],
  loading: false,
  error: null,

  rateOrder: async (order_id, data) => {
    set({ loading: true, error: null });
    try {
      const res = await ratingApi.rateOrder(order_id, data);
      set({ loading: false });
      return res.data;
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to rate order', loading: false });
    }
  },

  fetchRestaurantRatings: async (restaurant_id, params = {}) => {
    set({ loading: true, error: null });
    try {
      const res = await ratingApi.getRestaurantRatings(restaurant_id, params);
      set({ restaurantRatings: res.data.data || [], loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to fetch ratings', loading: false });
    }
  },
}));
