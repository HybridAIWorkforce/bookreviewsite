
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

// AI Tools pricing (in points)
const AI_TOOLS_PRICING = {
  BLURB_GENERATOR: 40,
  QUERY_LETTER_ASSISTANT: 75,
  REVIEW_SOLICITATOR: 50,
  MARKETING_COPY: 30,
  COVER_ANALYSIS: 150,
  PLOT_HOLE_DETECTOR: 200,
  REVIEW_TO_BLURB: 60,
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        activities: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        badges: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Calculate stats
    const reviewsCount = await prisma.review.count({
      where: { reviewerId: user.id },
    })

    const booksCount = await prisma.book.count({
      where: { userId: user.id },
    })

    // Calculate points by activity type
    const pointsByActivity = await prisma.activity.groupBy({
      by: ['activityType'],
      where: { userId: user.id },
      _sum: { pointsEarned: true },
    })

    const activityBreakdown = pointsByActivity.reduce((acc: any, item) => {
      acc[item.activityType] = item._sum.pointsEarned || 0
      return acc
    }, {})

    // Get level info
    const { LEVEL_NAMES, LEVEL_BADGES, LEVEL_THRESHOLDS, calculateUserLevel } = await import('@/lib/points-calculator')
    const currentLevel = user.level
    const nextLevel = currentLevel < 5 ? currentLevel + 1 : 5
    const currentLevelThreshold = LEVEL_THRESHOLDS[currentLevel]
    const nextLevelThreshold = LEVEL_THRESHOLDS[nextLevel]
    const progressToNextLevel = nextLevel > currentLevel 
      ? ((user.citationBalance - currentLevelThreshold) / (nextLevelThreshold - currentLevelThreshold)) * 100
      : 100

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        level: user.level,
        levelName: LEVEL_NAMES[user.level],
        levelBadge: LEVEL_BADGES[user.level],
        citationBalance: user.citationBalance,
        reviewCount: user.reviewCount,
        streakDays: user.streakDays,
        reviewerType: user.reviewerType,
        profileCompleted: user.profileCompleted,
        amazonProfileLinked: user.amazonProfileLinked,
        socialMediaBoostClaimed: user.socialMediaBoostClaimed,
      },
      stats: {
        totalReviews: reviewsCount,
        totalBooks: booksCount,
        progressToNextLevel: Math.min(progressToNextLevel, 100),
        nextLevelThreshold,
      },
      activityBreakdown,
      recentActivities: user.activities,
      badges: user.badges,
      tools: Object.entries(AI_TOOLS_PRICING).map(([key, value]) => ({
        id: key,
        name: key.split('_').map(w => w.charAt(0) + w.slice(1).toLowerCase()).join(' '),
        cost: value,
        available: user.citationBalance >= value,
      })),
    })
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { toolId } = await req.json()

    if (!toolId || !AI_TOOLS_PRICING[toolId as keyof typeof AI_TOOLS_PRICING]) {
      return NextResponse.json({ error: 'Invalid tool ID' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const cost = AI_TOOLS_PRICING[toolId as keyof typeof AI_TOOLS_PRICING]

    if (user.citationBalance < cost) {
      return NextResponse.json(
        { error: 'Insufficient points', required: cost, available: user.citationBalance },
        { status: 400 }
      )
    }

    // Deduct points (placeholder - in a real implementation, this would trigger the actual AI tool)
    await prisma.user.update({
      where: { id: user.id },
      data: {
        citationBalance: { decrement: cost },
      },
    })

    return NextResponse.json({
      success: true,
      message: `${toolId} activated (placeholder)`,
      pointsSpent: cost,
      newBalance: user.citationBalance - cost,
    })
  } catch (error) {
    console.error('Error using AI tool:', error)
    return NextResponse.json(
      { error: 'Failed to use AI tool' },
      { status: 500 }
    )
  }
}
