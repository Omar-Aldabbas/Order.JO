import { Link } from "react-router-dom";

export const CategoryCard = ({ options }) => {
  return (
    <Link 
      to={`/restaurants?category=${encodeURIComponent(options.name)}`} 
      className="block"
    >
      <div className="rounded-lg w-full group cursor-pointer bg-background hover:shadow-md transition-shadow lg:bg-[#f5f5f5]">
        <div className="h-50 w-full overflow-hidden rounded-xl">
          <img
            src={options.img}
            alt={options.alt}
            className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        <div className="px-4 py-2 space-y-1">
          <h4 className="font-semibold text-secondary text-md">
            {options.name}
          </h4>
          {options.additiontext && (
            <p className="text-primary text-xs line-clamp-1">
              {options.additiontext}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};
