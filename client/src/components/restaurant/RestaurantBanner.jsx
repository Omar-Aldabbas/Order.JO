export const RestaurantBanner = ({ coverImage,logo, name }) => {
  return (
    <div className="relative w-full h-64 md:h-96 rounded-b-xl overflow-hidden group cursor-pointer">
      {coverImage ? (
        <img
          src={coverImage}
          alt={name || "Restaurant Banner"}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-full bg-mute skeleton" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 to-transparent pointer-events-none" />

      <div className="absolute bottom-6 left-6 z-10 pointer-events-auto">
        {name ? (
          <h2 className="text-3xl md:text-4xl font-bold text-foreground animate-fade-in-left transition-all duration-500 group-hover:text-primary select-text">
            {name}
          </h2>
        ) : (
          <div className="w-64 h-8 rounded-full bg-mute skeleton" />
        )}
      </div>

      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
    </div>
  );
};
