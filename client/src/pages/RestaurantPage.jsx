import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getRestaurantById } from "../api/user"; 
import { RestaurantBanner } from "../components/restaurant/RestaurantBanner";
import { RestaurantInfo } from "../components/restaurant/RestaurantInfo";
import { RestaurantLocation } from "../components/restaurant/RestaurantLocation";
import { MenuSection } from "../components/restaurant/RestaurantMenu";
import { RestaurantRating } from "../components/restaurant/RestaurantRating";
import { WorkingHoursSection } from "../components/restaurant/RestaurantOperationHours";

export const RestaurantPage = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRestaurant = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getRestaurantById(id);
      setRestaurant(data);
    } catch (err) {
      const message = err?.message || "Failed to load restaurant";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchRestaurant();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-20 h-20 border-4 border-t-primary border-b-secondary rounded-full animate-spin"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-center text-red-600 text-xl md:text-2xl font-bold">
          Oops! Something went wrong while loading the restaurant. <br />
          Please check your connection or try again later.
        </p>
      </div>
    );

  if (!restaurant)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-center text-gray-500 text-lg md:text-xl">
          No restaurant data available.
        </p>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      <RestaurantBanner
        coverImage={restaurant.cover_image}
        logo={restaurant.profile_image}
        name={restaurant.name}
      />
      <RestaurantInfo restaurant={restaurant} />
      <MenuSection restaurantId={id} />
          <WorkingHoursSection restaurant={restaurant} />
      <RestaurantLocation restaurant={restaurant} />
      <RestaurantRating restaurantId={id} />
    </div>
  );
};
