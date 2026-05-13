'use client'

import { Star } from 'lucide-react'

type StarRatingProps = {
  rating: number
  onRatingChange?: (rating: number) => void
  readonly?: boolean
}

export function StarRating({ rating, onRatingChange, readonly = false }: StarRatingProps) {
  return (
    <div className="flex gap-1" role="group" aria-label={`Rating: ${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => !readonly && onRatingChange?.(star)}
          disabled={readonly}
          className={`transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded ${!readonly && 'hover:scale-110 cursor-pointer'}`}
          aria-label={`${star} star${star > 1 ? 's' : ''}`}
          aria-pressed={star <= rating}
        >
          <Star
            className={`h-8 w-8 ${star <= rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'}`}
            aria-hidden="true"
          />
        </button>
      ))}
    </div>
  )
}
