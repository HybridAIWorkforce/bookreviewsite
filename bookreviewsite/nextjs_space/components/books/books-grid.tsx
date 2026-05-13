
'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BookCard } from './book-card'
import { Search, Filter } from 'lucide-react'

type Book = {
  id: string
  title: string
  authorName: string
  genre: string
  description: string
  coverImageUrl: string | null
  rating: number
  reviewCount: number
}

export function BooksGrid() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('all')

  // Fetch books from API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true)
        const params = new URLSearchParams()
        if (searchTerm) params.append('search', searchTerm)
        if (selectedGenre && selectedGenre !== 'all') params.append('genre', selectedGenre)
        
        const response = await fetch(`/api/books?${params.toString()}`)
        if (!response.ok) throw new Error('Failed to fetch books')
        
        const data = await response.json()
        setBooks(data)
      } catch (error) {
        console.error('Error fetching books:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [searchTerm, selectedGenre])

  // Get all unique genres from books
  const allGenres = ['Fiction', 'Non-Fiction', 'Science Fiction', 'Fantasy', 'Romance', 'Mystery', 'Thriller', 'Business', 'Self-Help', 'Biography', 'History', 'Poetry', 'Other']

  return (
    <section className="py-16">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Search and Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <Input
              placeholder="Search books or authors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              aria-label="Search books or authors"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genres</SelectItem>
                {allGenres.map((genre) => (
                  <SelectItem key={genre} value={genre}>
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Books Grid */}
        {loading ? (
          <div className="text-center py-12" role="status" aria-live="polite">
            <p className="text-muted-foreground text-lg">Loading books...</p>
          </div>
        ) : books.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {books.map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 1, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <BookCard book={book} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No books found{searchTerm || selectedGenre !== 'all' ? ' matching your criteria' : ' yet'}.</p>
            {(searchTerm || selectedGenre !== 'all') && (
              <Button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedGenre('all')
                }}
                variant="outline"
                className="mt-4"
              >
                Clear Filters
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
