import { MapPin, User } from 'lucide-react'

export const RestaurantCard = ({ restaurant }) => {
  const serviceTypeLabel = {
    order: 'Delivery',
    reservation: 'Dine-in',
    both: 'Dine-in & Delivery',
  }

  return (
    <div className="flex flex-col rounded-xl overflow-hidden border border-secondary/20 w-full max-w-sm hover:shadow-md transition">
      <div className="h-[180px] w-full bg-order relative flex items-end p-2">
        {restaurant.cover_image && (
          <img
            src={restaurant.cover_image}
            alt={restaurant.name}
            className="h-full w-full object-cover absolute top-0 left-0"
            onError={e => (e.currentTarget.style.display = 'none')}
          />
        )}
        <span className="relative z-10 text-xs text-foreground font-semibold">
          {serviceTypeLabel[restaurant.service_type]}
        </span>
      </div>
      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-center gap-3">
          {restaurant.profile_image ? (
            <img
              src={restaurant.profile_image}
              alt={restaurant.name}
              className="w-12 h-12 rounded-full object-cover"
              onError={e => (e.currentTarget.style.display = 'none')}
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-foreground">
              <User size={20} />
            </div>
          )}
          <div className="flex flex-col">
            <h3 className="font-bold text-lg text-secondary">
              {restaurant.name}
            </h3>
            <small className="text-xs text-primary/80 capitalize">
              {restaurant.type}
            </small>
          </div>
        </div>
        {restaurant.address && (
          <div className="flex items-center gap-1 text-xs text-secondary/80 mt-1">
            <MapPin size={14} />
            <span>{restaurant.address}</span>
          </div>
        )}
      </div>
    </div>
  )
}
