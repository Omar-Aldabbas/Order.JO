export const RestaurantInfoSkeleton = () => {
  return (
    <div className="w-full bg-foreground rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center gap-6 shadow-md">
      <div className="w-20 h-20 rounded-full bg-mute skeleton shrink-0" />

      <div className="flex-1 flex flex-col gap-3">
        <div className="w-3/5 h-6 bg-mute rounded-full skeleton" />
        <div className="w-2/5 h-4 bg-mute rounded-full skeleton" />
        <div className="flex flex-col gap-2 mt-2">
          <div className="w-1/2 h-4 bg-mute rounded-full skeleton" />
          <div className="w-2/5 h-4 bg-mute rounded-full skeleton" />
        </div>
      </div>
    </div>
  );
};
