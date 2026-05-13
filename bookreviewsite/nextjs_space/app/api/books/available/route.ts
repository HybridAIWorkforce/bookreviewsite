

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get books that are:
    // 1. Approved
    // 2. NOT written by the current user
    // 3. NOT already reviewed by the current user
    const books = await prisma.book.findMany({
      where: {
        status: 'APPROVED',
        userId: {
          not: session.user.id,
        },
        reviews: {
          none: {
            reviewerId: session.user.id,
          },
        },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
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
    console.error('Error fetching available books:', error)
    return NextResponse.json(
      { error: 'Failed to fetch available books' },
      { status: 500 }
    )
  }
}

