import API from "./api"; 

export const registerUser = async (data) => {
  try {
    const res = await API.post("/register", data);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Registration failed" };
  }
};

export const loginUser = async (data) => {
  try {
    const res = await API.post("/login", data);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Login failed" };
  }
};

export const logoutUser = async () => {
  try {
    const res = await API.post("/logout");
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Logout failed" };
  }
};



export const forgotPassword = async (email) => {
  try {
    const res = await API.post("/forgot-password", { email });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Forgot password failed" };
  }
};

export const resetPassword = async (data) => {
  try {
    const res = await API.post("/reset-password", data);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Reset password failed" };
  }
};
