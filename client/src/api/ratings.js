import API from "./api"; 

export const rateOrder = async (order_id, data) => {
  try {
    const res = await API.post(`/ratings/${order_id}`, data);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to rate order" };
  }
};

export const getRestaurantRatings = async (restaurant_id, params = {}) => {
  try {
    const res = await API.get(`/ratings/restaurant/${restaurant_id}`, { params });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch restaurant ratings" };
  }
};
