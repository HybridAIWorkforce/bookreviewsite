

'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit, Trash2, Loader2, Eye, BookOpen, MessageSquare, Star } from 'lucide-react'
import { BookSubmissionDialog } from './book-submission-dialog'
import { toast } from '@/components/ui/use-toast'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import Link from 'next/link'

interface Book {
  id: string
  title: string
  authorName: string
  genre: string
  description: string
  coverImageUrl: string | null
  bookLink: string | null
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  rating: number
  reviewCount: number
  createdAt: string
}

interface MyBooksTabProps {
  onUpdate?: () => void
}

export function MyBooksTab({ onUpdate }: MyBooksTabProps) {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingBook, setEditingBook] = useState<Book | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [bookToDelete, setBookToDelete] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/books?userBooks=true')
      if (!response.ok) throw new Error('Failed to fetch books')
      const data = await response.json()
      setBooks(data)
    } catch (error) {
      console.error('Error fetching books:', error)
      toast({
        title: 'Error',
        description: 'Failed to load your books',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!bookToDelete) return

    try {
      setDeleting(true)
      const response = await fetch(`/api/books?id=${bookToDelete}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete book')

      toast({
        title: 'Success',
        description: 'Book deleted successfully',
      })

      await fetchBooks()
      if (onUpdate) onUpdate()
    } catch (error) {
      console.error('Error deleting book:', error)
      toast({
        title: 'Error',
        description: 'Failed to delete book',
        variant: 'destructive',
      })
    } finally {
      setDeleting(false)
      setDeleteDialogOpen(false)
      setBookToDelete(null)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-500'
      case 'REJECTED':
        return 'bg-red-500'
      default:
        return 'bg-yellow-500'
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
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>My Books</CardTitle>
              <CardDescription>Manage your submitted books</CardDescription>
            </div>
            <Button onClick={() => {
              setEditingBook(null)
              setDialogOpen(true)
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Submit New Book
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {books.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-lg font-semibold mb-2">No books yet</h3>
              <p className="text-muted-foreground mb-4">
                Submit your first book to get started
              </p>
              <Button onClick={() => setDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Submit Book
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {books.map((book) => (
                <div
                  key={book.id}
                  className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="relative w-full md:w-24 aspect-[2/3] bg-muted rounded-md overflow-hidden flex-shrink-0">
                    {book.coverImageUrl ? (
                      <Image
                        src={book.coverImageUrl}
                        alt={`Cover of ${book.title}`}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="font-semibold text-lg line-clamp-1">{book.title}</h3>
                        <p className="text-sm text-muted-foreground">by {book.authorName}</p>
                      </div>
                      <Badge className={getStatusColor(book.status)}>
                        {book.status}
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                      {book.description}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        {book.reviewCount} reviews
                      </span>
                      {book.reviewCount > 0 && (
                        <span className="flex items-center">
                          <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                          {book.rating.toFixed(1)}
                        </span>
                      )}
                      <span className="px-2 py-1 bg-muted rounded text-xs">
                        {book.genre}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      {book.status === 'APPROVED' && (
                        <Link href={`/books/${book.id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </Link>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingBook(book)
                          setDialogOpen(true)
                        }}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setBookToDelete(book.id)
                          setDeleteDialogOpen(true)
                        }}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <BookSubmissionDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        editingBook={editingBook}
        onSuccess={() => {
          fetchBooks()
          if (onUpdate) onUpdate()
        }}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete your book and all its reviews. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-red-500 hover:bg-red-600"
            >
              {deleting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

