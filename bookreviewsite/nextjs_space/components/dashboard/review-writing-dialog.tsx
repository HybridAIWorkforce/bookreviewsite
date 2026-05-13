

'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader2, Star, Award, ExternalLink } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'

interface ReviewWritingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  book: any
  onSuccess: () => void
}

const REVIEW_TYPES = {
  VERIFIER: {
    name: 'The Verifier',
    description: 'Verified Purchase Review on Amazon (150 base pts)',
    minWords: 0,
    requiresAmazon: true,
  },
  ADVOCATE: {
    name: 'The Advocate',
    description: 'Non-Verified Amazon Review (100 base pts)',
    minWords: 0,
    requiresAmazon: true,
  },
  INSIDER: {
    name: 'The Insider',
    description: 'Detailed Site Review - 300+ words (50 base pts)',
    minWords: 300,
    requiresAmazon: false,
  },
  SUPPORTER: {
    name: 'The Supporter',
    description: 'Standard Site Review - 150+ words (25 base pts)',
    minWords: 150,
    requiresAmazon: false,
  },
}

export function ReviewWritingDialog({ open, onOpenChange, book, onSuccess }: ReviewWritingDialogProps) {
  const [loading, setLoading] = useState(false)
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [reviewText, setReviewText] = useState('')
  const [reviewType, setReviewType] = useState<keyof typeof REVIEW_TYPES>('SUPPORTER')
  const [amazonLink, setAmazonLink] = useState('')
  const [amazonVerified, setAmazonVerified] = useState(false)

  useEffect(() => {
    if (open) {
      setRating(0)
      setHoverRating(0)
      setReviewText('')
      setReviewType('SUPPORTER')
      setAmazonLink('')
      setAmazonVerified(false)
    }
  }, [open])

  const getWordCount = () => {
    return reviewText.trim().split(/\s+/).filter(Boolean).length
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (rating === 0) {
      toast({
        title: 'Error',
        description: 'Please select a rating',
        variant: 'destructive',
      })
      return
    }

    const wordCount = getWordCount()
    const minWords = REVIEW_TYPES[reviewType].minWords

    if (minWords > 0 && wordCount < minWords) {
      toast({
        title: 'Error',
        description: `This review type requires at least ${minWords} words. You have ${wordCount}.`,
        variant: 'destructive',
      })
      return
    }

    if (REVIEW_TYPES[reviewType].requiresAmazon && !amazonLink.trim()) {
      toast({
        title: 'Error',
        description: 'Amazon link is required for this review type',
        variant: 'destructive',
      })
      return
    }

    try {
      setLoading(true)
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookId: book.id,
          rating,
          reviewText: reviewText.trim(),
          reviewType,
          amazonLink: amazonLink.trim() || undefined,
          amazonVerified,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to submit review')
      }

      const data = await response.json()

      toast({
        title: 'Success!',
        description: `Review submitted! You earned ${data.citationsEarned} citations!`,
      })

      onSuccess()
      onOpenChange(false)
    } catch (error: any) {
      console.error('Error submitting review:', error)
      toast({
        title: 'Error',
        description: error.message || 'Failed to submit review',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  if (!book) return null

  const currentType = REVIEW_TYPES[reviewType]
  const wordCount = getWordCount()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Write a Review for &quot;{book.title}&quot;</DialogTitle>
          <DialogDescription>
            Select your review type and share your thoughts to earn citations.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="reviewType">
              Review Type <span className="text-red-500">*</span>
            </Label>
            <Select value={reviewType} onValueChange={(value) => setReviewType(value as keyof typeof REVIEW_TYPES)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(REVIEW_TYPES).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value.name} - {value.description}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              {currentType.minWords > 0 && `Minimum ${currentType.minWords} words required. `}
              {currentType.requiresAmazon && 'Amazon link required.'}
            </p>
          </div>

          {currentType.requiresAmazon && (
            <div className="space-y-2">
              <Label htmlFor="amazonLink">
                Amazon Review Link <span className="text-red-500">*</span>
              </Label>
              <Input
                id="amazonLink"
                value={amazonLink}
                onChange={(e) => setAmazonLink(e.target.value)}
                placeholder="https://www.amazon.com/review/..."
                type="url"
              />
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
                Paste the link to your Amazon review
              </p>
            </div>
          )}

          <div className="space-y-2">
            <Label>
              Rating <span className="text-red-500">*</span>
            </Label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded"
                  aria-label={`${star} star${star > 1 ? 's' : ''}`}
                  aria-pressed={star <= rating}
                >
                  <Star
                    aria-hidden="true"
                    className={`h-8 w-8 ${
                      star <= (hoverRating || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-muted-foreground">
                {rating > 0 ? `${rating} star${rating > 1 ? 's' : ''}` : 'Click to rate'}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reviewText">
              Your Review <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="reviewText"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder={`Share your thoughts about this book...${currentType.minWords > 0 ? ` (minimum ${currentType.minWords} words)` : ''}`}
              rows={8}
              required
            />
            <p className="text-sm text-muted-foreground" aria-live="polite">
              {wordCount} {currentType.minWords > 0 ? `/ ${currentType.minWords}` : ''} words
              {currentType.minWords > 0 && wordCount >= currentType.minWords && (
                <span className="text-green-600 ml-2">✓ Requirement met</span>
              )}
            </p>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Review'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

