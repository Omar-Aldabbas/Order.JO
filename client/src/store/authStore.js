import { create } from "zustand";
import { registerUser, loginUser, logoutUser, forgotPassword, resetPassword } from "../api/auth";

export const useAuthStore = create((set) => ({
  user: null,
  role: null,
  token: localStorage.getItem("auth_token") || null,
  isAuth: !!localStorage.getItem("auth_token"),
  loading: false,
  error: null,

  login: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const data = await loginUser(credentials);
      localStorage.setItem("auth_token", data.access_token);
      localStorage.setItem("role",data.role)
      set({
        user: data.user,
        role: data.role || data.user?.role || null,
        token: data.access_token,
        isAuth: true,
        loading: false,
      });
      return data;
    } catch (err) {
      set({ error: err.message || "Login failed", loading: false });
      throw err;
    }
  },

  register: async (values) => {
    set({ loading: true, error: null });
    try {
      const data = await registerUser(values);
      localStorage.setItem("auth_token", data.access_token);
      set({
        user: data.user,
        role: data.role || data.user?.role || null,
        token: data.access_token,
        isAuth: true,
        loading: false,
      });
      return data;
    } catch (err) {
      set({ error: err.message || "Registration failed S", loading: false });
      throw err;
    }
  },

  logout: async () => {
    try {
      await logoutUser();
    } catch {}
    localStorage.removeItem("auth_token");
    localStorage.removeItem("role");
    set({ user: null, role: null, token: null, isAuth: false, loading: false });
  },

  forgotPassword: async (email) => {
    set({ loading: true, error: null });
    try {
      const data = await forgotPassword(email);
      set({ loading: false });
      return data;
    } catch (err) {
      set({ error: err.message || "Forgot password failed", loading: false });
      throw err;
    }
  },

  resetPassword: async (payload) => {
    set({ loading: true, error: null });
    try {
      const data = await resetPassword(payload);
      set({ loading: false });
      return data;
    } catch (err) {
      set({ error: err.message || "Reset password failed", loading: false });
      throw err;
    }
  },
}));
