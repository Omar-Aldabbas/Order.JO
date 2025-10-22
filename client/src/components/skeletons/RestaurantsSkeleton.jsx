export const RestaurantsSkeleton = () => {
  return (
    <div className="relative skeleton bg-mute w-full h-64 rounded-lg p-4 overflow-hidden">
      <div className="space-y-3">
        <div className=" w-1/3 rounded-md"></div>

        <div className=" w-1/2 rounded-md"></div>

        <div className="space-y-2 pt-6">
          <div className="skeleton h-3 w-2/3 rounded-md"></div>
          <div className="skeleton h-3 w-1/2 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};
