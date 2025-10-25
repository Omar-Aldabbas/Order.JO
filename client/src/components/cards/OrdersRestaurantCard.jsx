export const OrdersRestaurantCard = ({ options }) => {
  return (
    <div
      className="w-[40%] lg:w-full h-56 flex flex-col bg-primary items-center gap-3 rounded-xl text-center shrink-0 group 
                    hover:shadow-md active:shadow-md text-lg active:text-xl transition-all duration-300 overflow-hidden pb-2"
    >
      <div className="w-full min-h-[80%] lg:min-h-[80%] overflow-hidden">
        <img
          src={options.img}
          alt={options.alt}
          className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-110 group-active:scale-105"
        />
      </div>
      <div className="w-full h-full text-wrap flex items-center justify-center">
        <h4 className="text-foreground font-semibold ">
          {options.name}
        </h4>
      </div>
    </div>
  )
}
