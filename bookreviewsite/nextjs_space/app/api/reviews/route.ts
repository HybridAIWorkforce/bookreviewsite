

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

    const reviews = await prisma.review.findMany({
      where: {
        reviewerId: session.user.id,
      },
      include: {
        book: {
          select: {
            id: true,
            title: true,
            authorName: true,
            coverImageUrl: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(reviews)
  } catch (error: any) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
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

    const { bookId, rating, reviewText, reviewType, amazonLink, amazonVerified } = await req.json()

    // Validate input
    if (!bookId || !rating || !reviewText || !reviewType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      )
    }

    // Calculate word count
    const wordCount = reviewText.trim().split(/\s+/).length

    // Validate word count based on review type
    if (reviewType === 'INSIDER' && wordCount < 300) {
      return NextResponse.json(
        { error: 'Detailed reviews must be at least 300 words' },
        { status: 400 }
      )
    }

    if (reviewType === 'SUPPORTER' && wordCount < 150) {
      return NextResponse.json(
        { error: 'Standard reviews must be at least 150 words' },
        { status: 400 }
      )
    }

    // Validate Amazon link for Amazon review types
    if ((reviewType === 'VERIFIER' || reviewType === 'ADVOCATE') && !amazonLink) {
      return NextResponse.json(
        { error: 'Amazon link is required for Amazon reviews' },
        { status: 400 }
      )
    }

    // Check if book exists
    const book = await prisma.book.findUnique({
      where: { id: bookId },
    })

    if (!book) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 })
    }

    // Check if user is the book owner
    if (book.userId === session.user.id) {
      return NextResponse.json(
        { error: 'You cannot review your own book' },
        { status: 400 }
      )
    }

    // Check if user has already reviewed this book
    const existingReview = await prisma.review.findUnique({
      where: {
        reviewerId_bookId: {
          reviewerId: session.user.id,
          bookId,
        },
      },
    })

    if (existingReview) {
      return NextResponse.json(
        { error: 'You have already reviewed this book' },
        { status: 400 }
      )
    }

    // Get user's current review count for frequency bonus calculation
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { reviewCount: true, citationBalance: true },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Calculate points using the formula
    const { calculateReviewPoints, calculateUserLevel, ACTIVITY_POINTS } = await import('@/lib/points-calculator')
    const citationsEarned = calculateReviewPoints(
      reviewType,
      user.reviewCount,
      book.genre,
      book.isDebut
    )

    const newBalance = user.citationBalance + citationsEarned
    const newLevel = calculateUserLevel(newBalance)

    // Create review and update user in a transaction
    const result = await prisma.$transaction([
      prisma.review.create({
        data: {
          reviewerId: session.user.id,
          bookId,
          rating,
          reviewText: reviewText.trim(),
          reviewType,
          amazonLink: amazonLink || null,
          amazonVerified: amazonVerified || false,
          wordCount,
          citationsEarned,
        },
      }),
      prisma.user.update({
        where: { id: session.user.id },
        data: {
          citationBalance: newBalance,
          reviewCount: { increment: 1 },
          level: newLevel,
        },
      }),
      prisma.activity.create({
        data: {
          userId: session.user.id,
          activityType: 'REVIEW_WRITTEN',
          pointsEarned: citationsEarned,
          metadata: JSON.stringify({ bookId, reviewType }),
        },
      }),
    ])

    return NextResponse.json({
      success: true,
      review: result[0],
      citationsEarned,
      newBalance,
      newLevel,
    })
  } catch (error: any) {
    console.error('Review creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    )
  }
}

