import { useEffect, useState } from 'react'
import { OrdersRestaurantSkeleton } from './skeletons/OrdersRestaurantsSkeleton'
import { RESTAURANTS } from '../data/ordersRestaurants'
import { OrdersRestaurantCard } from './cards/OrdersRestaurantCard'
import { cn } from '../utils/cn'
export const OrdersRestaurantsSection = () => {
  const [isMobile, setIsmobile] = useState(false)
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setTimeout(() => {
      try {
        setData(RESTAURANTS)
        setIsLoading(false)
      } catch (err) {
        setError(err)
        setIsLoading(false)
      }
    }, 2000)

    const handleResize = () => {
      setIsmobile(window.innerWidth < 1024)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="w-full py-5 flex flex-col justify-center gap-4 min-h-[40vh] lg:min-h-[20vh]">
      <div>
        <h2 className="text-secondary font-semibold text-3xl p-5">
          Popular Restuarants to Order from
        </h2>
      </div>

      <div
        className={cn(
          isMobile ? 'flex gap-4 overflow-x-auto scroll-smooth scroll-hide justify-between w-full' :
          'grid grid-cols-6 gap-4'
        )}
      >
        {isLoading &&
          Array.from({ length: 6 }).map((_, i) => (
            <OrdersRestaurantSkeleton key={i} />
          ))}

        {data &&
          data.map((res, i) => (
            <OrdersRestaurantCard
              options={{
                img: res.img,
                alt: res.alt,
                name: res.name,
              }}
              key={i}
            />
          ))}
      </div>
    </div>
  )
}
