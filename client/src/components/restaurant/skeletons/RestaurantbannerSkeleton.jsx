export const RestaurantBannerSkeleton = () => {
  return (
    <div className="relative w-full h-64 md:h-96 rounded-b-xl overflow-hidden skeleton bg-mute">
      <div className="w-full h-full bg-mute skeleton" />

      <div className="absolute bottom-4 left-4 flex items-center gap-4 bg-black/20 p-3 rounded-lg">
        <div className="w-12 h-12 rounded-full bg-mute skeleton" />
        <div className="w-40 h-6 rounded-full bg-mute skeleton" />
      </div>
    </div>
  );
};
