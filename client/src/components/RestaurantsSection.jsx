import { useEffect, useState } from "react"
import { RestaurantsSkeleton } from "./skeletons/RestaurantsSkeleton"


// this section to display restaurants with reservations type

export const RestaurantsSection = () => {

  const [data, setData] = useState(null)      
  const [isLoading, setIsLoading] = useState(true) 
  const [error, setError] = useState(null)     

  useEffect(() => {
    setTimeout(() => {
      try {
        const fakeData = { title: "Hello API" }
        // setData(fakeData)
        // setIsLoading(false)
      } catch (err) {
        setError(err)
        // setIsLoading(false)
      }
    }, 2000)
  }, [])

  // if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

//   return <div>Data: {data.title}</div>
 return (
    <div className="w-full py-5 flex flex-col justify-center">
        <div>
            <h2 className="text-secondary font-semibold text-3xl p-5">Up to -40% 🎊 Order.JO exclusive deals</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-4 py-5">
            {isLoading && Array.from({ length: 3}).map((_, index) => (
                <RestaurantsSkeleton key={index} />
            ))}
        </div>
    </div>
 )
}