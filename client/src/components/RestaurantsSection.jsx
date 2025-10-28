import { useEffect, useState } from "react"
import { RestaurantsSkeleton } from "./skeletons/RestaurantsSkeleton"
import { getRestaurants } from "../api/user"

export const RestaurantsSection = () => {
  const [restaurants, setRestaurants] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const res = await getRestaurants({ service_type: "reservation", limit: 3 })
        const data = res.restaurants?.data || []
        const filtered = data.filter(r => r.service_type === "reservation" || r.service_type === "both").slice(0, 3)
        setRestaurants(filtered)
      } catch (err) {
        setError(err)
      }
      setIsLoading(false)
    }
    fetchData()
  }, [])

  const renderCard = (restaurant) => (
    <div key={restaurant.id} className="relative w-full h-64 rounded-xl overflow-hidden">
      <div
        className="w-full h-full bg-mute bg-center bg-cover flex flex-col justify-end p-4"
        style={{ backgroundImage: restaurant.coverImage ? `url(${restaurant.coverImage})` : "none" }}
      >
        <h3 className="text-foreground font-bold text-lg">{restaurant.name}</h3>
        <span className="text-primary text-sm">{restaurant.type}</span>
        <span className="text-order text-sm">{restaurant.service_type === "both" ? "Dine-in & Delivery" : restaurant.service_type}</span>
      </div>
    </div>
  )

  const renderFallback = (message) => (
    <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-4">
      <div className="relative w-full h-64 rounded-xl overflow-hidden bg-mute flex items-center justify-center">
        <span className="text-secondary font-semibold">{message}</span>
      </div>
      <div className="relative w-full h-64 rounded-xl overflow-hidden bg-mute flex items-center justify-center">
        <span className="text-secondary font-semibold">Check your data or server</span>
      </div>
    </div>
  )

  return (
    <div className="w-full py-5 flex flex-col justify-center">
      <div>
        <h2 className="text-secondary font-semibold text-3xl p-5">
          Up to -40% 🎊 Order.JO exclusive deals
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-4 py-5">
        {isLoading &&
          Array.from({ length: 3 }).map((_, index) => <RestaurantsSkeleton key={index} />)}

        {!isLoading && error && renderFallback("Error loading data")}

        {!isLoading && !error && restaurants.length === 0 && renderFallback("No data yet")}

        {!isLoading && !error && restaurants.length > 0 &&
          restaurants.map((restaurant) => renderCard(restaurant))}
      </div>
    </div>
  )
}
