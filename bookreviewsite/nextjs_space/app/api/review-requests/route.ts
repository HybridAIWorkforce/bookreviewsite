
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { calculateReviewPoints } from '@/lib/points-calculator'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { bookId, reviewerType } = await req.json()

    // Validate input
    if (!bookId || !reviewerType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get book details
    const book = await prisma.book.findUnique({
      where: { id: bookId },
    })

    if (!book) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 })
    }

    // Check if user owns the book
    if (book.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'You can only request reviews for your own books' },
        { status: 403 }
      )
    }

    // Get user's current balance
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { citationBalance: true, reviewCount: true },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Calculate cost using the same formula as earning
    // We'll use an average reviewer (review count = 10) for cost estimation
    const pointsCost = calculateReviewPoints(
      reviewerType,
      10, // Average reviewer frequency
      book.genre,
      book.isDebut
    )

    // Check if user has sufficient balance
    if (user.citationBalance < pointsCost) {
      return NextResponse.json(
        { 
          error: 'Insufficient points',
          required: pointsCost,
          available: user.citationBalance,
        },
        { status: 400 }
      )
    }

    // Create review request and deduct points
    const result = await prisma.$transaction([
      prisma.reviewRequest.create({
        data: {
          authorId: session.user.id,
          bookId,
          reviewerType,
          pointsCost,
          status: 'PENDING',
        },
      }),
      prisma.user.update({
        where: { id: session.user.id },
        data: {
          citationBalance: { decrement: pointsCost },
        },
      }),
    ])

    return NextResponse.json({
      success: true,
      reviewRequest: result[0],
      pointsSpent: pointsCost,
      newBalance: user.citationBalance - pointsCost,
    })
  } catch (error) {
    console.error('Error creating review request:', error)
    return NextResponse.json(
      { error: 'Failed to create review request' },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const searchParams = req.nextUrl.searchParams
    const type = searchParams.get('type') // 'sent' or 'received'

    if (type === 'sent') {
      // Requests sent by this user (as author)
      const requests = await prisma.reviewRequest.findMany({
        where: { authorId: session.user.id },
        include: {
          book: {
            select: {
              id: true,
              title: true,
              authorName: true,
              coverImageUrl: true,
            },
          },
          reviewer: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      })

      return NextResponse.json(requests)
    } else if (type === 'received') {
      // Requests received by this user (as potential reviewer)
      const requests = await prisma.reviewRequest.findMany({
        where: {
          reviewerId: session.user.id,
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          book: {
            select: {
              id: true,
              title: true,
              authorName: true,
              coverImageUrl: true,
              description: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      })

      return NextResponse.json(requests)
    } else {
      // Get all available review requests (unassigned)
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { reviewerType: true },
      })

      const requests = await prisma.reviewRequest.findMany({
        where: {
          reviewerId: null,
          status: 'PENDING',
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          book: {
            select: {
              id: true,
              title: true,
              authorName: true,
              coverImageUrl: true,
              description: true,
              genre: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      })

      return NextResponse.json(requests)
    }
  } catch (error) {
    console.error('Error fetching review requests:', error)
    return NextResponse.json(
      { error: 'Failed to fetch review requests' },
      { status: 500 }
    )
  }
}
