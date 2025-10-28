import React from 'react'
import { Star } from 'lucide-react'

export const ReviewCard = ({ review }) => {
  return (
    <div className="bg-background rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300">
      <div className="flex items-center gap-3 mb-3">
        <img
          src={review?.user?.profile_image || '/placeholder-user.jpg'}
          alt={review?.user?.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold text-foreground">{review?.user?.name}</h3>
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={16}
                className={`${
                  i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">{review.review || 'No comment provided.'}</p>
    </div>
  )
}
