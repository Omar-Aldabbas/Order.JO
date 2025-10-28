export const RestaurantInfo = ({ restaurant }) => {
  const serviceType =
    restaurant.service_type === "both"
      ? "Dine-In & Delivery"
      : restaurant.service_type?.charAt(0).toUpperCase() + restaurant.service_type?.slice(1);

  return (
    <div className="w-full bg-foreground rounded-xl p-8 flex flex-col md:flex-row items-start md:items-center gap-8 shadow-lg border border-mute transition hover:shadow-xl">
      {restaurant.profile_image ? (
        <img
          src={restaurant.profile_image}
          alt={restaurant.name}
          className="w-24 h-24 rounded-full object-cover shrink-0 border-2 border-primary"
        />
      ) : (
        <div className="w-24 h-24 rounded-full bg-mute shrink-0 border-2 border-secondary/30 animate-pulse" />
      )}

      <div className="flex-1 flex flex-col gap-3">
        <h2 className="text-3xl font-extrabold text-secondary">{restaurant.name}</h2>

        <p className="text-sm text-primary font-medium">
          {restaurant.type ? restaurant.type.charAt(0).toUpperCase() + restaurant.type.slice(1) : "Unknown"} •{" "}
          {serviceType || "Service Info Not Provided"}
        </p>

        {restaurant.bio && (
          <p className="text-sm text-secondary/80 mt-2 leading-relaxed">{restaurant.bio}</p>
        )}

        <div className="flex flex-col mt-3 text-sm gap-2 text-secondary/90">
          {restaurant.phone && (
            <span className="flex items-center gap-2">
              <span className="text-primary font-semibold">📞</span> {restaurant.phone}
            </span>
          )}
          {restaurant.address && (
            <span className="flex items-center gap-2">
              <span className="text-primary font-semibold">📍</span> {restaurant.address}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
