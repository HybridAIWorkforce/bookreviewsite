
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'citations'; // citations, level, streak, reviews
    const limit = parseInt(searchParams.get('limit') || '50');

    let orderBy: any = {};
    
    switch (type) {
      case 'citations':
      case 'points': // Backward compatibility
        orderBy = { citationBalance: 'desc' };
        break;
      case 'level':
        orderBy = [{ level: 'desc' }, { citationBalance: 'desc' }];
        break;
      case 'streak':
        orderBy = { streakDays: 'desc' };
        break;
      case 'reviews':
        orderBy = { reviewCount: 'desc' };
        break;
      default:
        orderBy = { citationBalance: 'desc' };
    }

    const users = await prisma.user.findMany({
      where: {
        reviewCount: {
          gt: 0, // Only show users who have written at least one review
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        citationBalance: true,
        level: true,
        reviewCount: true,
        reviewerType: true,
        streakDays: true,
        lastLoginDate: true,
      },
      orderBy,
      take: limit,
    });

    // Add rank to each user
    const rankedUsers = users.map((user: any, index: number) => ({
      ...user,
      rank: index + 1,
      isCurrentUser: session?.user?.email === user.email,
    }));

    return NextResponse.json({
      success: true,
      leaderboard: rankedUsers,
      type,
    });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch leaderboard' },
      { status: 500 }
    );
  }
}
