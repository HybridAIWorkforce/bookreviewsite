
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Star, BookOpen, User, ExternalLink } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'

interface BookCardProps {
  book: {
    id: string
    title: string
    authorName: string
    genre: string
    description: string
    coverImageUrl: string | null
    rating: number
    reviewCount: number
  }
}

export function BookCard({ book }: BookCardProps) {
  const { data: session } = useSession() || {}
  const [imageError, setImageError] = useState(false)

  const handleReviewClick = () => {
    if (!session) {
      // Redirect to signin
      window.location.href = '/auth/signin'
      return
    }
    // Redirect to review page
    window.location.href = `/books/${book.id}/review`
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02, translateY: -5 }}
      transition={{ duration: 0.2 }}
      className="rounded-xl overflow-hidden group border bg-card shadow-sm"
    >
      {/* Book Cover */}
      <div className="relative aspect-[3/4] bg-muted overflow-hidden">
        {book.coverImageUrl && !imageError ? (
          <Image
            src={book.coverImageUrl}
            alt={`Cover of ${book.title}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <BookOpen className="h-16 w-16 text-muted-foreground" aria-hidden="true" />
          </div>
        )}
        
        {/* Genre Badge */}
        <div className="absolute top-2 left-2">
          <span className="bg-primary/90 text-primary-foreground text-xs px-2 py-1 rounded-full">
            {book.genre}
          </span>
        </div>
        
        {/* Rating Badge */}
        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1" aria-label={`Rating: ${book.rating} out of 5`}>
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" aria-hidden="true" />
          <span>{book.rating}</span>
        </div>
      </div>

      {/* Book Details */}
      <div className="p-4 space-y-3 bg-background">
        <div>
          <h3 className="font-semibold text-lg mb-1 line-clamp-1 text-foreground">{book.title}</h3>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
            <User className="h-3 w-3 mr-1" aria-hidden="true" />
            <span>{book.authorName}</span>
          </div>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {book.description}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
          <span>{book.reviewCount} reviews</span>
          <div className="flex" aria-label={`${Math.floor(book.rating)} out of 5 stars`} role="img">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                aria-hidden="true"
                className={`h-3 w-3 ${
                  star <= Math.floor(book.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2">
          <Button
            onClick={handleReviewClick}
            size="sm"
            className="flex-1"
          >
            <BookOpen className="h-3 w-3 mr-1" aria-hidden="true" />
            Review
          </Button>
          <Link href={`/books/${book.id}`}>
            <Button variant="outline" size="sm" aria-label={`View details for ${book.title}`}>
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
