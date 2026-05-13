
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { StarRating } from '@/components/star-rating'
import { toast } from '@/hooks/use-toast'
import { BookOpen, Star, User, ExternalLink, Calendar } from 'lucide-react'
import { format } from 'date-fns'

type BookDetailProps = {
  book: any
  currentUserId?: string
  userReview?: any
}

export function BookDetail({ book, currentUserId, userReview }: BookDetailProps) {
  const router = useRouter()
  const [rating, setRating] = useState(5)
  const [reviewText, setReviewText] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const isOwner = currentUserId === book.userId
  const hasReviewed = !!userReview
  const canReview = currentUserId && !isOwner && !hasReviewed

  const averageRating =
    book.reviews.length > 0
      ? book.reviews.reduce((sum: number, review: any) => sum + review.rating, 0) / book.reviews.length
      : 0

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!currentUserId) {
      toast({
        title: 'Authentication required',
        description: 'Please sign in to submit a review.',
        variant: 'destructive',
      })
      router.push('/auth/signin')
      return
    }

    if (reviewText.trim().length < 50) {
      toast({
        title: 'Review too short',
        description: 'Please write at least 50 characters.',
        variant: 'destructive',
      })
      return
    }

    setSubmitting(true)

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookId: book.id,
          rating,
          reviewText,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit review')
      }

      toast({
        title: 'Review submitted!',
        description: `You earned ${data.starsEarned} star(s)! 🌟`,
      })

      setReviewText('')
      setRating(5)
      router.refresh()
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      {/* Book Header */}
      <div className="grid md:grid-cols-[300px_1fr] gap-8 mb-8">
        {/* Book Cover */}
        <div className="relative aspect-[2/3] bg-muted rounded-lg overflow-hidden">
          {book.coverImageUrl ? (
            <Image
              src={book.coverImageUrl}
              alt={`Cover of ${book.title} by ${book.authorName}`}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <BookOpen className="h-24 w-24 text-muted-foreground" aria-hidden="true" />
            </div>
          )}
        </div>

        {/* Book Info */}
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Link href="/books" className="hover:text-primary">
              Books
            </Link>
            <span>/</span>
            <span>{book.genre}</span>
          </div>

          <h1 className="text-4xl font-bold mb-2">{book.title}</h1>
          <p className="text-xl text-muted-foreground mb-4">by {book.authorName}</p>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="flex" role="img" aria-label={`${averageRating.toFixed(1)} out of 5 stars`}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    aria-hidden="true"
                    className={`h-5 w-5 ${
                      star <= averageRating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {averageRating.toFixed(1)} ({book.reviews.length} reviews)
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4" aria-hidden="true" />
              <span>{book.user.name || book.user.email}</span>
            </div>
          </div>

          <div className="prose dark:prose-invert mb-6">
            <p className="text-muted-foreground">{book.description}</p>
          </div>

          {book.bookLink && !book.bookLink.includes('amazon.com/dp/B07X') && (
            <Button asChild variant="outline">
              <a href={book.bookLink} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" aria-hidden="true" />
                View Book Link
              </a>
            </Button>
          )}

          <div className="mt-4 text-sm text-muted-foreground">
            <Calendar className="inline h-4 w-4 mr-1" aria-hidden="true" />
            <span>Posted on {format(new Date(book.createdAt), 'MMMM d, yyyy')}</span>
          </div>
        </div>
      </div>

      {/* Review Form */}
      {canReview && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Write a Review</CardTitle>
            <CardDescription>
              Share your thoughts about this book and earn citations!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <Label htmlFor="rating">Rating</Label>
                <StarRating rating={rating} onRatingChange={setRating} />
              </div>

              <div>
                <Label htmlFor="review">Your Review (minimum 50 characters)</Label>
                <Textarea
                  id="review"
                  placeholder="What did you think of this book? Share your honest opinion..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  rows={6}
                  required
                  minLength={50}
                />
                <p className="text-sm text-muted-foreground mt-1" aria-live="polite">
                  {reviewText.length} / 50 characters minimum
                </p>
              </div>

              <Button type="submit" disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit Review & Earn Citations'}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {isOwner && (
        <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-sm text-blue-900 dark:text-blue-100">
            👋 This is your book. You cannot review your own book.
          </p>
        </div>
      )}

      {hasReviewed && !isOwner && (
        <div className="mb-8 p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
          <p className="text-sm text-green-900 dark:text-green-100">
            ✅ You have already reviewed this book. Thank you!
          </p>
        </div>
      )}

      {!currentUserId && (
        <Card className="mb-8 border-2 border-dashed">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground mb-4">Sign in to write a review and earn citations</p>
            <Button asChild>
              <Link href="/auth/signin">Sign In</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Reviews ({book.reviews.length})</h2>

        {book.reviews.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center text-muted-foreground">
              No reviews yet. Be the first to review this book!
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {book.reviews.map((review: any) => (
              <Card key={review.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        {review.reviewer.name || review.reviewer.email}
                      </CardTitle>
                      <CardDescription>
                        {format(new Date(review.createdAt), 'MMMM d, yyyy')}
                      </CardDescription>
                    </div>
                    <div className="flex" role="img" aria-label={`${review.rating} out of 5 stars`}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          aria-hidden="true"
                          className={`h-5 w-5 ${
                            star <= review.rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground whitespace-pre-wrap">{review.reviewText}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
