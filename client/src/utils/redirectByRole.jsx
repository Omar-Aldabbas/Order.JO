import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';

export const redirectByRole = (role, navigate) => {
  const routes = {
    user: '/home',
    courier: '/driver',
    restaurant: '/myrestaurant',
    support: '/supportpanel',
  };
  navigate(routes[role] || '/login');
};

export const useAutoRedirectIfAuth = (navigate) => {
  const token = useAuthStore((state) => state.token);
  const role = useAuthStore((state) => state.role);

  const isAuth = !!token && !!role;

  useEffect(() => {
    if (isAuth) {
      redirectByRole(role, navigate);
    }
  }, [isAuth, role, navigate]);
};
