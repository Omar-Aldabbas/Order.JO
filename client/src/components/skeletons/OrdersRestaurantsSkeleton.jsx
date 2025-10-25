export const OrdersRestaurantSkeleton = () => {
  return (
    <div className="w-[40%] lg:w-full h-48 flex flex-col bg-mute items-center  skeleton gap-4 rounded-xl overflow-hidden shrink-0">
      <div className="skeleton bg-mute w-full h-32" />
      <div className="skeleton w-[80%] shadow-inner h-6 rounded-full " />
    </div>
  )
}
