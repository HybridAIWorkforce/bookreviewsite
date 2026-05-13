

'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Loader2, Star, MessageSquare, Award } from 'lucide-react'
import { ReviewWritingDialog } from './review-writing-dialog'
import { toast } from '@/components/ui/use-toast'

interface Book {
  id: string
  title: string
  authorName: string
  genre: string
  description: string
  coverImageUrl: string | null
  bookLink: string | null
  rating: number
  reviewCount: number
  createdAt: string
}

interface AvailableToReviewTabProps {
  onUpdate?: () => void
}

export function AvailableToReviewTab({ onUpdate }: AvailableToReviewTabProps) {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/books/available')
      if (!response.ok) throw new Error('Failed to fetch books')
      const data = await response.json()
      setBooks(data)
    } catch (error) {
      console.error('Error fetching books:', error)
      toast({
        title: 'Error',
        description: 'Failed to load available books',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12" role="status">
        <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden="true" /><span className="sr-only">Loading...</span>
      </div>
    )
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Available to Review</CardTitle>
          <CardDescription>
            Review books from other authors and earn citations
          </CardDescription>
        </CardHeader>
        <CardContent>
          {books.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-lg font-semibold mb-2">No books available</h3>
              <p className="text-muted-foreground">
                You've reviewed all available books! Check back later for more.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map((book) => (
                <div
                  key={book.id}
                  className="flex flex-col border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative w-full aspect-[2/3] bg-muted">
                    {book.coverImageUrl ? (
                      <Image
                        src={book.coverImageUrl}
                        alt={`Cover of ${book.title}`}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen className="h-12 w-12 text-muted-foreground" aria-hidden="true" />
                      </div>
                    )}
                    <Badge className="absolute top-2 right-2 bg-yellow-500 hover:bg-yellow-600">
                      <Award className="h-3 w-3 mr-1" />
                      Earn 1 Citation
                    </Badge>
                  </div>

                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-semibold text-lg line-clamp-2 mb-1">{book.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">by {book.authorName}</p>

                    <p className="text-sm text-muted-foreground line-clamp-3 mb-3 flex-1">
                      {book.description}
                    </p>

                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                      <span className="px-2 py-1 bg-muted rounded text-xs">
                        {book.genre}
                      </span>
                      {book.reviewCount > 0 && (
                        <>
                          <span className="flex items-center">
                            <MessageSquare className="h-3 w-3 mr-1" />
                            {book.reviewCount}
                          </span>
                          <span className="flex items-center">
                            <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                            {book.rating.toFixed(1)}
                          </span>
                        </>
                      )}
                    </div>

                    <Button
                      className="w-full"
                      onClick={() => {
                        setSelectedBook(book)
                        setDialogOpen(true)
                      }}
                    >
                      Write Review
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <ReviewWritingDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        book={selectedBook}
        onSuccess={() => {
          fetchBooks()
          if (onUpdate) onUpdate()
        }}
      />
    </div>
  )
}

