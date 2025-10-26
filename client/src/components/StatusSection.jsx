import { useEffect, useState } from "react"
import { useInView } from "../hooks/useInView"
import { cn } from "../utils/cn"
import { Separator, StatCard } from "./cards/StatusCard"

const DATA = {
  riders: 564,
  orders: 789900,
  restaurants: 690,
  items: 17457,
}

const DURATION = 2000

export const StatusSection = () => {
  const [ref, isVisible] = useInView()
  const [counts, setCounts] = useState({
    riders: 0,
    orders: 0,
    restaurants: 0,
    items: 0,
  })

  useEffect(() => {
    if (!isVisible) return

    const startTime = performance.now()

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(1 - Math.pow(1 - elapsed / DURATION, 3), 1)

      setCounts({
        riders: Math.floor(DATA.riders * progress),
        orders: Math.floor(DATA.orders * progress),
        restaurants: Math.floor(DATA.restaurants * progress),
        items: Math.floor(DATA.items * progress),
      })

      if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [isVisible])

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col justify-center items-center gap-4 p-8 lg:text-nowrap rounded-xl text-foreground bg-primary my-7 w-full",
        "md:grid md:grid-cols-7 md:gap-0 md:justify-items-center"
      )}
    >
      <StatCard label="Registered Riders" value={counts.riders} />
      <Separator />
      <StatCard label="Orders Delivered" value={counts.orders} />
      <Separator />
      <StatCard label="Restaurants Partnered" value={counts.restaurants} />
      <Separator />
      <StatCard label="Food Items" value={counts.items} />
    </div>
  )
}


