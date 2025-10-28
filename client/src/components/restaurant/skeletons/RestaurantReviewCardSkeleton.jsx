
export const ReviewCardSkeleton = () => {
  return (
    <div className="animate-pulse bg-muted/40 rounded-xl p-4 shadow-md">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-full bg-muted" />
        <div className="flex-1">
          <div className="h-3 w-24 bg-muted rounded" />
          <div className="h-2 w-16 bg-muted rounded mt-1" />
        </div>
      </div>
      <div className="h-3 bg-muted rounded w-3/4 mb-2" />
      <div className="h-3 bg-muted rounded w-1/2" />
    </div>
  )
}
