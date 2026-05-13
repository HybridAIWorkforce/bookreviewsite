
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { ActivityType } from '@prisma/client'
import { ACTIVITY_POINTS, calculateUserLevel } from '@/lib/points-calculator'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { activities: { where: { activityType: 'DAILY_LOGIN' } } },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check if already logged in today
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const todayLogin = user.activities.find(
      (a) => new Date(a.createdAt) >= today
    )

    if (todayLogin) {
      return NextResponse.json({
        message: 'Already logged in today',
        pointsEarned: 0,
        streakDays: user.streakDays,
      })
    }

    // Calculate new streak
    const lastLogin = user.lastLoginDate ? new Date(user.lastLoginDate) : null
    let newStreakDays = 1

    if (lastLogin) {
      lastLogin.setHours(0, 0, 0, 0)
      const daysSinceLastLogin = Math.floor(
        (today.getTime() - lastLogin.getTime()) / (1000 * 60 * 60 * 24)
      )

      if (daysSinceLastLogin === 1) {
        newStreakDays = user.streakDays + 1
      } else if (daysSinceLastLogin === 0) {
        newStreakDays = user.streakDays
      } else {
        newStreakDays = 1 // Reset streak
      }
    }

    // Base points for login
    let totalPoints = ACTIVITY_POINTS.DAILY_LOGIN
    const activities = []

    // Add login activity
    activities.push({
      userId: user.id,
      activityType: ActivityType.DAILY_LOGIN,
      pointsEarned: ACTIVITY_POINTS.DAILY_LOGIN,
    })

    // Check for streak bonuses
    if (newStreakDays === 7) {
      totalPoints += ACTIVITY_POINTS.STREAK_7_DAY
      activities.push({
        userId: user.id,
        activityType: ActivityType.STREAK_7_DAY,
        pointsEarned: ACTIVITY_POINTS.STREAK_7_DAY,
      })
    } else if (newStreakDays === 30) {
      totalPoints += ACTIVITY_POINTS.STREAK_30_DAY
      activities.push({
        userId: user.id,
        activityType: ActivityType.STREAK_30_DAY,
        pointsEarned: ACTIVITY_POINTS.STREAK_30_DAY,
      })
    }

    const newBalance = user.citationBalance + totalPoints
    const newLevel = calculateUserLevel(newBalance)

    // Update database
    await prisma.$transaction([
      ...activities.map((activity) => prisma.activity.create({ data: activity })),
      prisma.user.update({
        where: { id: user.id },
        data: {
          citationBalance: newBalance,
          lastLoginDate: new Date(),
          streakDays: newStreakDays,
          level: newLevel,
        },
      }),
    ])

    return NextResponse.json({
      message: 'Daily login recorded',
      pointsEarned: totalPoints,
      newBalance,
      streakDays: newStreakDays,
      level: newLevel,
    })
  } catch (error) {
    console.error('Error recording daily login:', error)
    return NextResponse.json(
      { error: 'Failed to record daily login' },
      { status: 500 }
    )
  }
}
