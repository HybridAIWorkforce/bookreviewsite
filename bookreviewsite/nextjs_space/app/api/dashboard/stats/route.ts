

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

    // Get user with all relevant fields
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        citationBalance: true,
        level: true,
        reviewCount: true,
        streakDays: true,
        reviewerType: true,
        profileCompleted: true,
        amazonProfileLinked: true,
        socialMediaBoostClaimed: true,
      },
    })

    // Get total books submitted
    const totalBooksSubmitted = await prisma.book.count({
      where: { userId: session.user.id },
    })

    // Get total reviews written
    const totalReviewsWritten = await prisma.review.count({
      where: { reviewerId: session.user.id },
    })

    // Get total reviews received on user's books
    const totalReviewsReceived = await prisma.review.count({
      where: {
        book: {
          userId: session.user.id,
        },
      },
    })

    // Get badges
    const badges = await prisma.badge.findMany({
      where: { userId: session.user.id },
    })

    // Get level info
    const { LEVEL_NAMES, LEVEL_BADGES, LEVEL_THRESHOLDS } = await import('@/lib/points-calculator')
    const currentLevel = user?.level || 1
    const nextLevel = currentLevel < 5 ? currentLevel + 1 : 5
    const currentLevelThreshold = LEVEL_THRESHOLDS[currentLevel]
    const nextLevelThreshold = LEVEL_THRESHOLDS[nextLevel]
    const progressToNextLevel = nextLevel > currentLevel 
      ? ((user?.citationBalance || 0) - currentLevelThreshold) / (nextLevelThreshold - currentLevelThreshold) * 100
      : 100

    return NextResponse.json({
      citationBalance: user?.citationBalance || 0,
      level: user?.level || 1,
      levelName: LEVEL_NAMES[user?.level || 1],
      levelBadge: LEVEL_BADGES[user?.level || 1],
      reviewCount: user?.reviewCount || 0,
      reviewerType: user?.reviewerType || 'SUPPORTER',
      streakDays: user?.streakDays || 0,
      progressToNextLevel: Math.min(Math.max(progressToNextLevel, 0), 100),
      nextLevelThreshold,
      totalBooksSubmitted,
      totalReviewsWritten,
      totalReviewsReceived,
      badges: badges.map(b => b.badgeType),
      profileCompleted: user?.profileCompleted || false,
      amazonProfileLinked: user?.amazonProfileLinked || false,
      socialMediaBoostClaimed: user?.socialMediaBoostClaimed || false,
    })
  } catch (error: any) {
    console.error('Error fetching dashboard stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    )
  }
}

