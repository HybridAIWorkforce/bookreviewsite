
'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Trophy, Award, Flame, BookOpen, Crown, Medal, Star } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface LeaderboardUser {
  id: string;
  name: string | null;
  email: string;
  citationBalance: number;
  level: number;
  reviewCount: number;
  reviewerType: string;
  streakDays: number;
  lastLoginDate: Date | null;
  rank: number;
  isCurrentUser: boolean;
}

export default function LeaderboardPage() {
  const { data: session } = useSession() || {};
  const [leaderboardType, setLeaderboardType] = useState<'citations' | 'level' | 'streak' | 'reviews'>('citations');
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard(leaderboardType);
  }, [leaderboardType]);

  const fetchLeaderboard = async (type: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/leaderboard?type=${type}&limit=50`);
      const data = await response.json();
      
      if (data.success) {
        setLeaderboard(data.leaderboard);
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Medal className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getReviewerTypeBadge = (type: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      'NOVICE': 'secondary',
      'INTERMEDIATE': 'default',
      'VETERAN': 'outline',
      'EXPERT': 'destructive',
    };
    return <Badge variant={variants[type] || 'default'}>{type}</Badge>;
  };

  const getInitials = (name: string | null, email: string) => {
    if (name) {
      return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    return email.slice(0, 2).toUpperCase();
  };

  const getStatValue = (user: LeaderboardUser) => {
    switch (leaderboardType) {
      case 'citations':
        return `${user.citationBalance.toLocaleString()} citations`;
      case 'level':
        return `Level ${user.level}`;
      case 'streak':
        return `${user.streakDays} days`;
      case 'reviews':
        return `${user.reviewCount} reviews`;
      default:
        return '';
    }
  };

  const getTabIcon = (type: string) => {
    switch (type) {
      case 'citations':
        return <Trophy className="h-4 w-4 mr-2" />;
      case 'level':
        return <Award className="h-4 w-4 mr-2" />;
      case 'streak':
        return <Flame className="h-4 w-4 mr-2" />;
      case 'reviews':
        return <BookOpen className="h-4 w-4 mr-2" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Trophy className="h-16 w-16 text-primary" aria-hidden="true" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Leaderboard</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Compete with the best reviewers on Citeability
          </p>
        </div>

        {/* Leaderboard Card */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Top Reviewers</CardTitle>
            <CardDescription>
              See where you rank among the community
            </CardDescription>
            
            {/* Winners Highlight Section */}
            {!loading && leaderboard.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950/20 dark:to-yellow-900/20 border-yellow-200 dark:border-yellow-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs font-medium text-yellow-900 dark:text-yellow-100">🏆 Top Scorer</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-bold truncate text-sm">{leaderboard[0]?.name || leaderboard[0]?.email}</p>
                        <p className="text-xs text-muted-foreground">
                          {leaderboard[0]?.citationBalance.toLocaleString()} citations
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 border-blue-200 dark:border-blue-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs font-medium text-blue-900 dark:text-blue-100">📚 Most Active</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-bold truncate text-sm">
                          {leaderboard.reduce((max, user) => 
                            user.reviewCount > max.reviewCount ? user : max
                          ).name || leaderboard.reduce((max, user) => 
                            user.reviewCount > max.reviewCount ? user : max
                          ).email}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {leaderboard.reduce((max, user) => 
                            user.reviewCount > max.reviewCount ? user : max
                          ).reviewCount} reviews
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 border-orange-200 dark:border-orange-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs font-medium text-orange-900 dark:text-orange-100">🔥 Longest Streak</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-bold truncate text-sm">
                          {leaderboard.reduce((max, user) => 
                            user.streakDays > max.streakDays ? user : max
                          ).name || leaderboard.reduce((max, user) => 
                            user.streakDays > max.streakDays ? user : max
                          ).email}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {leaderboard.reduce((max, user) => 
                            user.streakDays > max.streakDays ? user : max
                          ).streakDays} days
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="citations" value={leaderboardType} onValueChange={(value) => setLeaderboardType(value as 'citations' | 'level' | 'streak' | 'reviews')}>
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger 
                  value="citations" 
                  className="flex items-center" 
                  data-testid="citations-tab"
                  onClick={() => setLeaderboardType('citations')}
                >
                  {getTabIcon('citations')}
                  <span className="sm:inline">Citations</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="level" 
                  className="flex items-center" 
                  data-testid="level-tab"
                  onClick={() => setLeaderboardType('level')}
                >
                  {getTabIcon('level')}
                  <span className="sm:inline">Level</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="streak" 
                  className="flex items-center" 
                  data-testid="streak-tab"
                  onClick={() => setLeaderboardType('streak')}
                >
                  {getTabIcon('streak')}
                  <span className="sm:inline">Streak</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="reviews" 
                  className="flex items-center" 
                  data-testid="reviews-tab"
                  onClick={() => setLeaderboardType('reviews')}
                >
                  {getTabIcon('reviews')}
                  <span className="sm:inline">Reviews</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="citations" className="space-y-4">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">Ranked by Total Citations</h3>
                  <p className="text-sm text-muted-foreground">Top reviewers by citation balance</p>
                </div>
                {loading ? (
                  // Loading skeleton
                  Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-lg border">
                      <Skeleton className="h-8 w-8" />
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                      <Skeleton className="h-6 w-20" />
                    </div>
                  ))
                ) : leaderboard.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Star className="h-12 w-12 mx-auto mb-4 opacity-50" aria-hidden="true" />
                    <p>No reviewers yet. Be the first!</p>
                  </div>
                ) : (
                  leaderboard.map((user) => (
                    <div
                      key={user.id}
                      className={`flex items-center gap-4 p-4 rounded-lg border transition-all hover:shadow-md ${
                        user.isCurrentUser ? 'bg-primary/5 border-primary' : 'bg-card'
                      }`}
                    >
                      {/* Rank */}
                      <div className="flex items-center justify-center w-12">
                        {getRankIcon(user.rank)}
                      </div>

                      {/* Avatar */}
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {getInitials(user.name, user.email)}
                        </AvatarFallback>
                      </Avatar>

                      {/* User Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold truncate">
                            {user.name || user.email}
                            {user.isCurrentUser && (
                              <Badge variant="outline" className="ml-2">You</Badge>
                            )}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          {getReviewerTypeBadge(user.reviewerType)}
                          <span>•</span>
                          <span>{user.reviewCount} reviews</span>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="text-right">
                        <p className="text-xl font-bold">{getStatValue(user)}</p>
                        {leaderboardType !== 'level' && (
                          <p className="text-sm text-muted-foreground">Level {user.level}</p>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </TabsContent>
              
              <TabsContent value="level" className="space-y-4">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">Ranked by Level</h3>
                  <p className="text-sm text-muted-foreground">Top reviewers by experience level</p>
                </div>
                {loading ? (
                  // Loading skeleton
                  Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-lg border">
                      <Skeleton className="h-8 w-8" />
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                      <Skeleton className="h-6 w-20" />
                    </div>
                  ))
                ) : leaderboard.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Star className="h-12 w-12 mx-auto mb-4 opacity-50" aria-hidden="true" />
                    <p>No reviewers yet. Be the first!</p>
                  </div>
                ) : (
                  leaderboard.map((user) => (
                    <div
                      key={user.id}
                      className={`flex items-center gap-4 p-4 rounded-lg border transition-all hover:shadow-md ${
                        user.isCurrentUser ? 'bg-primary/5 border-primary' : 'bg-card'
                      }`}
                    >
                      {/* Rank */}
                      <div className="flex items-center justify-center w-12">
                        {getRankIcon(user.rank)}
                      </div>

                      {/* Avatar */}
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {getInitials(user.name, user.email)}
                        </AvatarFallback>
                      </Avatar>

                      {/* User Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold truncate">
                            {user.name || user.email}
                            {user.isCurrentUser && (
                              <Badge variant="outline" className="ml-2">You</Badge>
                            )}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          {getReviewerTypeBadge(user.reviewerType)}
                          <span>•</span>
                          <span>{user.reviewCount} reviews</span>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="text-right">
                        <p className="text-xl font-bold">{getStatValue(user)}</p>
                        {leaderboardType !== 'level' && (
                          <p className="text-sm text-muted-foreground">Level {user.level}</p>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </TabsContent>
              
              <TabsContent value="streak" className="space-y-4">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">Ranked by Streak</h3>
                  <p className="text-sm text-muted-foreground">Top reviewers by consecutive days</p>
                </div>
                {loading ? (
                  // Loading skeleton
                  Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-lg border">
                      <Skeleton className="h-8 w-8" />
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                      <Skeleton className="h-6 w-20" />
                    </div>
                  ))
                ) : leaderboard.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Star className="h-12 w-12 mx-auto mb-4 opacity-50" aria-hidden="true" />
                    <p>No reviewers yet. Be the first!</p>
                  </div>
                ) : (
                  leaderboard.map((user) => (
                    <div
                      key={user.id}
                      className={`flex items-center gap-4 p-4 rounded-lg border transition-all hover:shadow-md ${
                        user.isCurrentUser ? 'bg-primary/5 border-primary' : 'bg-card'
                      }`}
                    >
                      {/* Rank */}
                      <div className="flex items-center justify-center w-12">
                        {getRankIcon(user.rank)}
                      </div>

                      {/* Avatar */}
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {getInitials(user.name, user.email)}
                        </AvatarFallback>
                      </Avatar>

                      {/* User Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold truncate">
                            {user.name || user.email}
                            {user.isCurrentUser && (
                              <Badge variant="outline" className="ml-2">You</Badge>
                            )}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          {getReviewerTypeBadge(user.reviewerType)}
                          <span>•</span>
                          <span>{user.reviewCount} reviews</span>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="text-right">
                        <p className="text-xl font-bold">{getStatValue(user)}</p>
                        {leaderboardType !== 'level' && (
                          <p className="text-sm text-muted-foreground">Level {user.level}</p>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </TabsContent>
              
              <TabsContent value="reviews" className="space-y-4">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">Ranked by Reviews</h3>
                  <p className="text-sm text-muted-foreground">Most prolific reviewers</p>
                </div>
                {loading ? (
                  // Loading skeleton
                  Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-lg border">
                      <Skeleton className="h-8 w-8" />
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                      <Skeleton className="h-6 w-20" />
                    </div>
                  ))
                ) : leaderboard.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Star className="h-12 w-12 mx-auto mb-4 opacity-50" aria-hidden="true" />
                    <p>No reviewers yet. Be the first!</p>
                  </div>
                ) : (
                  leaderboard.map((user) => (
                    <div
                      key={user.id}
                      className={`flex items-center gap-4 p-4 rounded-lg border transition-all hover:shadow-md ${
                        user.isCurrentUser ? 'bg-primary/5 border-primary' : 'bg-card'
                      }`}
                    >
                      {/* Rank */}
                      <div className="flex items-center justify-center w-12">
                        {getRankIcon(user.rank)}
                      </div>

                      {/* Avatar */}
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {getInitials(user.name, user.email)}
                        </AvatarFallback>
                      </Avatar>

                      {/* User Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold truncate">
                            {user.name || user.email}
                            {user.isCurrentUser && (
                              <Badge variant="outline" className="ml-2">You</Badge>
                            )}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          {getReviewerTypeBadge(user.reviewerType)}
                          <span>•</span>
                          <span>{user.reviewCount} reviews</span>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="text-right">
                        <p className="text-xl font-bold">{getStatValue(user)}</p>
                        {leaderboardType !== 'level' && (
                          <p className="text-sm text-muted-foreground">Level {user.level}</p>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
