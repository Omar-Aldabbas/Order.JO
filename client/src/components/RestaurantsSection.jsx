import { useEffect, useState } from "react"
import { RestaurantsSkeleton } from "./skeletons/RestaurantsSkeleton"
export const RestaurantsSection = () => {

      const [data, setData] = useState(null)       // holds API data
  const [isLoading, setIsLoading] = useState(true) // loading state
  const [error, setError] = useState(null)     // error state

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      try {
        // imagine we fetch data here
        const fakeData = { title: "Hello API" }
        setData(fakeData)
        setIsLoading(false)
      } catch (err) {
        setError(err)
        setIsLoading(false)
      }
    }, 2000)
  }, [])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

//   return <div>Data: {data.title}</div>
 return (
    <div className="w-full py-5  flex flex-col justify-center">
        <div>
            <h2 className="text-secondary font-semibold text-3xl p-5">Up to -40% 🎊 Order.JO exclusive deals</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 w-full gap-4 py-5">
            {Array.from({ length: 3}).map((_, index) => (
                <RestaurantsSkeleton key={index} />
            ))}
        </div>
    </div>
 )
}