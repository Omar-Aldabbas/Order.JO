import { cn } from '../../utils/cn'

export const First = isMobile => {
  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <div
        className={cn(
          isMobile
            ? 'flex flex-col justify-center items-center gap-3'
            : 'grid grid-col-3 gap-3 justify justify-between items-center'
        )}
      >
        
      </div>
    </div>
  )
}
