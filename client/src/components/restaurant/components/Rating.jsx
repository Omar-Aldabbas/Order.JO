import React from 'react'
import { Star } from 'lucide-react'

export const Rating = ({ average, total }) => {
  return (
    <div className="rounded-xl bg-muted text-order font-bold text-shadow shadow-md hover:text-primary transition-all duration-400 text-center p-6 flex flex-col items-center justify-center">
      <div className="flex items-center justify-center gap-2 mb-2">
        <Star size={24} className="fill-yellow-400 text-yellow-400" />
        <span className="text-3xl">{average?.toFixed(1) || '0.0'}</span>
      </div>
      <p className="text-sm text-muted-foreground">{total} Reviews</p>
    </div>
  )
}
