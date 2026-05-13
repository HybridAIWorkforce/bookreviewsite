

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const genre = searchParams.get('genre')
    const search = searchParams.get('search')
    const userBooks = searchParams.get('userBooks') // New param for user's own books

    // If requesting user's own books, require authentication
    if (userBooks === 'true') {
      const session = await getServerSession(authOptions)
      if (!session?.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }

      const books = await prisma.book.findMany({
        where: {
          userId: session.user.id,
        },
        include: {
          reviews: {
            select: {
              id: true,
              rating: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      })

      const booksWithStats = books.map((book) => {
        const reviewCount = book.reviews.length
        const averageRating = reviewCount > 0
          ? book.reviews.reduce((sum, review) => sum + review.rating, 0) / reviewCount
          : 0

        return {
          id: book.id,
          title: book.title,
          authorName: book.authorName,
          genre: book.genre,
          description: book.description,
          coverImageUrl: book.coverImageUrl,
          bookLink: book.bookLink,
          status: book.status,
          rating: averageRating,
          reviewCount,
          createdAt: book.createdAt,
        }
      })

      return NextResponse.json(booksWithStats)
    }

    // Public books (approved only)
    const where: any = {
      status: 'APPROVED',
    }

    if (genre && genre !== 'all') {
      where.genre = genre
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { authorName: { contains: search, mode: 'insensitive' } },
      ]
    }

    const books = await prisma.book.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        reviews: {
          select: {
            id: true,
            rating: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    const booksWithStats = books.map((book) => {
      const reviewCount = book.reviews.length
      const averageRating = reviewCount > 0
        ? book.reviews.reduce((sum, review) => sum + review.rating, 0) / reviewCount
        : 0

      return {
        id: book.id,
        title: book.title,
        authorName: book.authorName,
        genre: book.genre,
        description: book.description,
        coverImageUrl: book.coverImageUrl,
        bookLink: book.bookLink,
        rating: averageRating,
        reviewCount,
        createdAt: book.createdAt,
      }
    })

    return NextResponse.json(booksWithStats)
  } catch (error: any) {
    console.error('Error fetching books:', error)
    return NextResponse.json(
      { error: 'Failed to fetch books' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { title, authorName, genre, description, coverImageUrl, bookLink, isDebut } = await req.json()

    // Validate input
    if (!title || !authorName || !genre || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Calculate difficulty multiplier
    const { getDifficultyMultiplier, ACTIVITY_POINTS, calculateUserLevel } = await import('@/lib/points-calculator')
    const difficultyMultiplier = getDifficultyMultiplier(genre, isDebut || false)

    // Get user's current balance
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { citationBalance: true },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const pointsEarned = ACTIVITY_POINTS.BOOK_ADDED
    const newBalance = user.citationBalance + pointsEarned
    const newLevel = calculateUserLevel(newBalance)

    // Create book and update user in a transaction
    const result = await prisma.$transaction([
      prisma.book.create({
        data: {
          userId: session.user.id,
          title: title.trim(),
          authorName: authorName.trim(),
          genre,
          description: description.trim(),
          coverImageUrl: coverImageUrl || null,
          bookLink: bookLink || null,
          status: 'PENDING',
          isDebut: isDebut || false,
          difficultyMultiplier,
        },
      }),
      prisma.user.update({
        where: { id: session.user.id },
        data: {
          citationBalance: newBalance,
          level: newLevel,
        },
      }),
      prisma.activity.create({
        data: {
          userId: session.user.id,
          activityType: 'BOOK_ADDED',
          pointsEarned,
        },
      }),
    ])

    return NextResponse.json({
      success: true,
      book: result[0],
      pointsEarned,
      newBalance,
    })
  } catch (error: any) {
    console.error('Error creating book:', error)
    return NextResponse.json(
      { error: 'Failed to create book' },
      { status: 500 }
    )
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id, title, authorName, genre, description, coverImageUrl, bookLink } = await req.json()

    if (!id) {
      return NextResponse.json({ error: 'Book ID is required' }, { status: 400 })
    }

    // Check if book exists and belongs to user
    const existingBook = await prisma.book.findUnique({
      where: { id },
    })

    if (!existingBook) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 })
    }

    if (existingBook.userId !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const book = await prisma.book.update({
      where: { id },
      data: {
        title: title?.trim(),
        authorName: authorName?.trim(),
        genre,
        description: description?.trim(),
        coverImageUrl,
        bookLink,
      },
    })

    return NextResponse.json({ success: true, book })
  } catch (error: any) {
    console.error('Error updating book:', error)
    return NextResponse.json(
      { error: 'Failed to update book' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Book ID is required' }, { status: 400 })
    }

    // Check if book exists and belongs to user
    const existingBook = await prisma.book.findUnique({
      where: { id },
    })

    if (!existingBook) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 })
    }

    if (existingBook.userId !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    await prisma.book.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting book:', error)
    return NextResponse.json(
      { error: 'Failed to delete book' },
      { status: 500 }
    )
  }
}

