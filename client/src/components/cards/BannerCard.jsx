import { Link } from 'react-router-dom'

export const BannerCard = options => {
  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden group hover:shadow-md">
      <img
        src={options.img}
        alt={options.alt}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      <div className="absolute inset-0 flex flex-col justify-between p-4 md:px-12 bg-gradient-to-tr from-black/40 to-transparent  group-hover:from-black/60">
        <div className="w-fit relative bg-foreground text-center rounded-xl px-8 py-2 left-0 -top-7 pt-6">
          <h4 className="text-secondary font-semibold text-xs md:text-lg">
            {options.flag}
          </h4>
        </div>

        <div className='relative space-y-5 pb-6'>
          <div className="w-fit">
            <p className="text-primary font-medium text-left mb-2">
              {options.upperText}
            </p>
            <h3 className="text-foreground text-3xl md:text-5xl font-bold">
              {options.lowerText}
            </h3>
          </div>

          <Link
            to={options.to}
            className="w-fit text-foreground bg-primary rounded-full text-sm md:text-lg px-3 py-1 md:px-8 md:py-2 font-semibold transition-all duration-200 hover:bg-secondary hover:shadow-inner"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  )
}
