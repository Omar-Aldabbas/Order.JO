import API from './api';

export const registerUser = async (data) => {
  const res = await API.post('/register', data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await API.post('/login', data);
  return res.data;
};

export const logoutUser = async () => {
  const res = await API.post('/logout');
  return res.data;
};

export const forgotPassword = async (email) => {
  const res = await API.post('/forgot-password', { email });
  return res.data;
};

export const resetPassword = async (data) => {
  const res = await API.post('/reset-password', data);
  return res.data;
};

export default API;
