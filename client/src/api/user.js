import APIFile from "./apiFile";
import API from "./api";

export const getProfile = async () => {
  try {
    const res = await API.get("/profile");
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch profile" };
  }
};


export const updateProfile = async (data) => {
  try {
    const res = await API.post("/profile", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to update profile" };
  }
};

export const requestRoleChange = async (data) => {
  try {
    const res = await API.post("/role-change-request", data);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Role change request failed" };
  }
};

export const getRestaurants = async (filters = {}) => {
  try {
    const res = await API.get("/restaurants", { params: filters });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch restaurants" };
  }
};

export const getMenu = async (restaurantId = "", filters = {}) => {
  try {
    const url = restaurantId ? `/restaurants/${restaurantId}/menu` : `/menu`;
    const res = await API.get(url, { params: filters });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch menu" };
  }
};


export const getCart = async () => {
  try {
    const res = await API.get("/cart");
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch cart" };
  }
};

export const addToCart = async (data) => {
  try {
    const res = await API.post("/cart", data);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to add to cart" };
  }
};

export const updateCartItem = async (id, data) => {
  try {
    const res = await API.put(`/cart/${id}`, data);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to update cart item" };
  }
};

export const removeCartItem = async (id) => {
  try {
    const res = await API.delete(`/cart/${id}`);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to remove cart item" };
  }
};

export const clearCart = async () => {
  try {
    const res = await API.delete("/cart");
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to clear cart" };
  }
};

export const placeOrder = async (data) => {
  try {
    const res = await API.post("/orders", data);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to place order" };
  }
};

export const cancelOrder = async (orderId) => {
  try {
    const res = await API.post(`/orders/${orderId}/cancel`);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to cancel order" };
  }
};

export const getOrderHistory = async () => {
  try {
    const res = await API.get("/orders/history");
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch order history" };
  }
};

export const makeReservation = async (data) => {
  try {
    const res = await API.post("/reservations", data);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to make reservation" };
  }
};

export const cancelReservation = async (reservationId) => {
  try {
    const res = await API.post(`/reservations/${reservationId}/cancel`);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to cancel reservation" };
  }
};

export const rateRestaurant = async (orderId, data) => {
  try {
    const res = await API.post(`/orders/${orderId}/rate`, data);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to rate restaurant" };
  }
};

export const getNotifications = async () => {
  try {
    const res = await API.get("/notifications");
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch notifications" };
  }
};

export const rateOrder = async (orderId, data) => {
  try {
    const res = await API.post(`/ratings/${orderId}`, data);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to rate order" };
  }
};

export const getRestaurantRatings = async (restaurantId) => {
  try {
    const res = await API.get(`/ratings/restaurant/${restaurantId}`);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch restaurant ratings" };
  }
};

// added after
export const getRelatedRestaurants = async (restaurantId) => {
  try {
    const res = await API.get(`/restaurants/related/${restaurantId}`);
    return res.data.related_restaurants || [];
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch related restaurants" };
  }
};

export const getRestaurantById = async (restaurantId) => {
  try {
    const res = await API.get(`/restaurants/${restaurantId}`);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch restaurant" };
  }
};