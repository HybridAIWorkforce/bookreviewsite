

'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader2, Upload } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import { uploadFile } from '@/lib/s3'

const GENRES = [
  'Fiction',
  'Non-Fiction',
  'Mystery',
  'Romance',
  'Sci-Fi',
  'Fantasy',
  'Business',
  'Self-Help',
]

interface BookSubmissionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  editingBook?: any
  onSuccess: () => void
}

export function BookSubmissionDialog({ open, onOpenChange, editingBook, onSuccess }: BookSubmissionDialogProps) {
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    authorName: '',
    genre: '',
    description: '',
    coverImageUrl: '',
    bookLink: '',
  })

  useEffect(() => {
    if (editingBook) {
      setFormData({
        title: editingBook.title || '',
        authorName: editingBook.authorName || '',
        genre: editingBook.genre || '',
        description: editingBook.description || '',
        coverImageUrl: editingBook.coverImageUrl || '',
        bookLink: editingBook.bookLink || '',
      })
    } else {
      setFormData({
        title: '',
        authorName: '',
        genre: '',
        description: '',
        coverImageUrl: '',
        bookLink: '',
      })
    }
  }, [editingBook, open])

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Error',
        description: 'Please upload an image file',
        variant: 'destructive',
      })
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'Error',
        description: 'Image must be less than 5MB',
        variant: 'destructive',
      })
      return
    }

    try {
      setUploading(true)
      const buffer = Buffer.from(await file.arrayBuffer())
      const fileName = `book-covers/${Date.now()}-${file.name}`
      const cloud_storage_path = await uploadFile(buffer, fileName)

      setFormData((prev) => ({ ...prev, coverImageUrl: cloud_storage_path }))
      toast({
        title: 'Success',
        description: 'Cover image uploaded successfully',
      })
    } catch (error) {
      console.error('Error uploading file:', error)
      toast({
        title: 'Error',
        description: 'Failed to upload cover image',
        variant: 'destructive',
      })
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.authorName || !formData.genre || !formData.description) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      })
      return
    }

    try {
      setLoading(true)
      const url = '/api/books'
      const method = editingBook ? 'PUT' : 'POST'
      const body = editingBook
        ? { ...formData, id: editingBook.id }
        : formData

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to submit book')
      }

      toast({
        title: 'Success',
        description: editingBook
          ? 'Book updated successfully'
          : 'Book submitted for review!',
      })

      onSuccess()
      onOpenChange(false)
    } catch (error: any) {
      console.error('Error submitting book:', error)
      toast({
        title: 'Error',
        description: error.message || 'Failed to submit book',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editingBook ? 'Edit Book' : 'Submit New Book'}</DialogTitle>
          <DialogDescription>
            {editingBook
              ? 'Update your book details'
              : 'Fill in the details to submit your book for review'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">
              Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="Enter book title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="authorName">
              Author Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="authorName"
              value={formData.authorName}
              onChange={(e) => setFormData((prev) => ({ ...prev, authorName: e.target.value }))}
              placeholder="Enter author name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="genre">
              Genre <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.genre}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, genre: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a genre" />
              </SelectTrigger>
              <SelectContent>
                {GENRES.map((genre) => (
                  <SelectItem key={genre} value={genre}>
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your book..."
              rows={5}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverImage">Cover Image</Label>
            <div className="flex items-center gap-2">
              <Input
                id="coverImage"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={uploading}
              />
              {uploading && <Loader2 className="h-4 w-4 animate-spin" />}
            </div>
            {formData.coverImageUrl && (
              <p className="text-sm text-muted-foreground">✓ Cover image uploaded</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="bookLink">Book Link (Optional)</Label>
            <Input
              id="bookLink"
              type="url"
              value={formData.bookLink}
              onChange={(e) => setFormData((prev) => ({ ...prev, bookLink: e.target.value }))}
              placeholder="https://amazon.com/your-book"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading || uploading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {editingBook ? 'Updating...' : 'Submitting...'}
                </>
              ) : (
                editingBook ? 'Update Book' : 'Submit Book'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

