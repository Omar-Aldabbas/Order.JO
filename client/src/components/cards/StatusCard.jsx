import { cn } from '../../utils/cn'

export const StatCard = ({ label, value }) => (
  <div className="flex flex-col items-center justify-center gap-2 py-4 px-6 text-center">
    <h3 className="text-5xl md:text-4xl lg:text-5xl font-bold">{value.toLocaleString()}+</h3>
    <p className="text-md md:text-sm lg:text-md font-semibold uppercase tracking-wide text-foreground/90">
      {label}
    </p>
  </div>
)

export const Separator = () => (
  <div
    className={cn(
      'w-3/5 h-[2px] bg-foreground/50 my-2',
      'md:w-[2px] md:h-4/5 md:bg-foreground/50 md:my-0 md:mx-6'
    )}
  />
)
