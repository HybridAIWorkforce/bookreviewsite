
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { ActivityType } from '@prisma/client'
import { ACTIVITY_POINTS, calculateUserLevel, LEVEL_THRESHOLDS } from '@/lib/points-calculator'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { activityType } = await req.json()

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { activities: true },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check if activity already completed today (for daily activities)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (activityType === 'DAILY_LOGIN') {
      const todayLogin = user.activities.find(
        (a) => a.activityType === 'DAILY_LOGIN' && a.createdAt >= today
      )
      if (todayLogin) {
        return NextResponse.json({ 
          message: 'Already logged in today',
          pointsEarned: 0,
        })
      }

      // Update streak
      const lastLogin = user.lastLoginDate
      let newStreakDays = 1
      if (lastLogin) {
        const daysSinceLastLogin = Math.floor(
          (today.getTime() - new Date(lastLogin).setHours(0, 0, 0, 0)) / (1000 * 60 * 60 * 24)
        )
        if (daysSinceLastLogin === 1) {
          newStreakDays = user.streakDays + 1
        } else if (daysSinceLastLogin > 1) {
          newStreakDays = 1
        } else {
          newStreakDays = user.streakDays
        }
      }

      // Check for streak bonuses
      let bonusPoints = 0
      let bonusActivities = []

      if (newStreakDays === 7) {
        bonusPoints += ACTIVITY_POINTS.STREAK_7_DAY
        bonusActivities.push({
          userId: user.id,
          activityType: ActivityType.STREAK_7_DAY,
          pointsEarned: ACTIVITY_POINTS.STREAK_7_DAY,
        })
      } else if (newStreakDays === 30) {
        bonusPoints += ACTIVITY_POINTS.STREAK_30_DAY
        bonusActivities.push({
          userId: user.id,
          activityType: ActivityType.STREAK_30_DAY,
          pointsEarned: ACTIVITY_POINTS.STREAK_30_DAY,
        })
      }

      const pointsEarned = ACTIVITY_POINTS.DAILY_LOGIN + bonusPoints
      const newBalance = user.citationBalance + pointsEarned

      // Create activity record(s)
      await prisma.activity.create({
        data: {
          userId: user.id,
          activityType: ActivityType.DAILY_LOGIN,
          pointsEarned: ACTIVITY_POINTS.DAILY_LOGIN,
        },
      })

      for (const bonus of bonusActivities) {
        await prisma.activity.create({ data: bonus })
      }

      // Update user
      await prisma.user.update({
        where: { id: user.id },
        data: {
          citationBalance: newBalance,
          lastLoginDate: new Date(),
          streakDays: newStreakDays,
          level: calculateUserLevel(newBalance),
        },
      })

      return NextResponse.json({
        message: 'Daily login recorded',
        pointsEarned,
        newBalance,
        streakDays: newStreakDays,
      })
    }

    // Handle other one-time activities
    const activityTypeEnum = activityType as ActivityType
    const pointsMap: Record<string, number> = {
      PROFILE_COMPLETED: ACTIVITY_POINTS.PROFILE_COMPLETED,
      AMAZON_LINKED: ACTIVITY_POINTS.AMAZON_LINKED,
      SOCIAL_MEDIA_BOOST: ACTIVITY_POINTS.SOCIAL_MEDIA_BOOST,
    }

    const points = pointsMap[activityType]
    if (!points) {
      return NextResponse.json({ error: 'Invalid activity type' }, { status: 400 })
    }

    // Check if already completed
    const existingActivity = user.activities.find(
      (a) => a.activityType === activityType
    )
    if (existingActivity) {
      return NextResponse.json({
        message: 'Activity already completed',
        pointsEarned: 0,
      })
    }

    const newBalance = user.citationBalance + points

    // Create activity record
    await prisma.activity.create({
      data: {
        userId: user.id,
        activityType: activityTypeEnum,
        pointsEarned: points,
      },
    })

    // Update user
    await prisma.user.update({
      where: { id: user.id },
      data: {
        citationBalance: newBalance,
        level: calculateUserLevel(newBalance),
        ...(activityType === 'PROFILE_COMPLETED' && { profileCompleted: true }),
        ...(activityType === 'AMAZON_LINKED' && { amazonProfileLinked: true }),
        ...(activityType === 'SOCIAL_MEDIA_BOOST' && { socialMediaBoostClaimed: true }),
      },
    })

    return NextResponse.json({
      message: 'Activity recorded',
      pointsEarned: points,
      newBalance,
    })
  } catch (error) {
    console.error('Error recording activity:', error)
    return NextResponse.json(
      { error: 'Failed to record activity' },
      { status: 500 }
    )
  }
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
          take: 50,
        },
      },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({
      activities: user.activities,
      totalPoints: user.citationBalance,
      level: user.level,
      streakDays: user.streakDays,
    })
  } catch (error) {
    console.error('Error fetching activities:', error)
    return NextResponse.json(
      { error: 'Failed to fetch activities' },
      { status: 500 }
    )
  }
}
