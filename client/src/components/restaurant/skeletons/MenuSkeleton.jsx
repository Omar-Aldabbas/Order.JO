import { MenuCardSkeleton } from './MenuCardSkeleton'

export const MenuSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
      {Array.from({ length: count }).map((_, idx) => (
        <MenuCardSkeleton key={idx} />
      ))}
    </div>
  )
}
