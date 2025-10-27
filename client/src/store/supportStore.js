import { create } from 'zustand';
import * as supportApi from '../api/support';

export const useSupportStore = create((set, get) => ({
  tickets: [],
  loading: false,
  error: null,

  fetchTickets: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const res = await supportApi.getTickets(params);
      set({ tickets: res.data.data, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to fetch tickets', loading: false });
    }
  },

  getTicket: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await supportApi.getTicket(id);
      return res.data;
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to get ticket', loading: false });
    }
  },

  createTicket: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await supportApi.createTicket(data);
      set({ tickets: [...get().tickets, res.data], loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to create ticket', loading: false });
    }
  },

  resolveTicket: async (id) => {
    set({ loading: true, error: null });
    try {
      await supportApi.resolveTicket(id);
      set({
        tickets: get().tickets.map(ticket =>
          ticket.id === id ? { ...ticket, status: 'resolved' } : ticket
        ),
        loading: false
      });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to resolve ticket', loading: false });
    }
  },

  refundOrder: async (order_id) => {
    set({ loading: true, error: null });
    try {
      await supportApi.refundOrder(order_id);
      set({ loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to refund order', loading: false });
    }
  },

  cancelReservation: async (reservation_id) => {
    set({ loading: true, error: null });
    try {
      await supportApi.cancelReservation(reservation_id);
      set({ loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to cancel reservation', loading: false });
    }
  },
}));
