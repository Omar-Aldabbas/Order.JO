import { create } from 'zustand';
import axios from '../api/auth'; 

export const useAuthStore = create((set) => ({
  user: null,
  access_token: null,
  loading: false,
  error: null,

  login: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post('/login', credentials);
      set({
        user: response.data.user,
        access_token: response.data.access_token,
        loading: false
      });
      localStorage.setItem('token', response.data.access_token);
    } catch (err) {
      set({ error: err.response?.data?.message || 'Login failed', loading: false });
    }
  },

  register: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post('/register', data);
      set({
        user: response.data.user,
        access_token: response.data.access_token,
        loading: false
      });
      localStorage.setItem('token', response.data.access_token);
    } catch (err) {
      set({ error: err.response?.data?.message || 'Registration failed', loading: false });
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await axios.post('/logout', null, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      set({ user: null, access_token: null, loading: false });
      localStorage.removeItem('token');
    } catch (err) {
      set({ error: err.response?.data?.message || 'Logout failed', loading: false });
    }
  },

  updateProfile: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.put('/profile', data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      set({ user: response.data.user, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Update failed', loading: false });
    }
  }
}));
