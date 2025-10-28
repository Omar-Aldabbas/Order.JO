// src/components/DebugBroadcast.js
import { useEffect } from "react";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

export const DebugBroadcast = () => {
  useEffect(() => {
    const echo = new Echo({
      broadcaster: "pusher",
      key: import.meta.env.VITE_PUSHER_APP_KEY,
      cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
      forceTLS: true,
    });

    echo.channel("orders").listen("OrderPlaced", (e) => {
      console.log("OrderPlaced event:", e);
      alert(`OrderPlaced: ${JSON.stringify(e)}`);
    });

    echo.channel("restaurant-rated").listen("RestaurantRated", (e) => {
      console.log("RestaurantRated event:", e);
      alert(`RestaurantRated: ${JSON.stringify(e)}`);
    });

    return () => {
      echo.disconnect();
    };
  }, []);

  return null;
};
