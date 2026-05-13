
'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  Award, 
  BookOpen, 
  MessageSquare, 
  TrendingUp, 
  Zap,
  Clock,
  Target,
  Star,
  Flame,
  Trophy,
  FileText,
  Mail,
  Image,
  Search,
  Repeat
} from 'lucide-react'
import { toast } from '@/components/ui/use-toast'

interface DashboardData {
  user: {
    name: string
    email: string
    level: number
    levelName: string
    levelBadge: string
    citationBalance: number
    reviewCount: number
    streakDays: number
    reviewerType: string
  }
  stats: {
    totalReviews: number
    totalBooks: number
    progressToNextLevel: number
    nextLevelThreshold: number
  }
  activityBreakdown: Record<string, number>
  recentActivities: any[]
  badges: any[]
  tools: {
    id: string
    name: string
    cost: number
    available: boolean
  }[]
}

const TOOL_ICONS: Record<string, any> = {
  BLURB_GENERATOR: FileText,
  QUERY_LETTER_ASSISTANT: Mail,
  REVIEW_SOLICITATOR: MessageSquare,
  MARKETING_COPY: TrendingUp,
  COVER_ANALYSIS: Image,
  PLOT_HOLE_DETECTOR: Search,
  REVIEW_TO_BLURB: Repeat,
}

const TOOL_DESCRIPTIONS: Record<string, string> = {
  BLURB_GENERATOR: 'Creates compelling book blurbs and synopses',
  QUERY_LETTER_ASSISTANT: 'Drafts and polishes query letters',
  REVIEW_SOLICITATOR: 'Crafts personalized reviewer emails',
  MARKETING_COPY: 'Creates social media and ad copy',
  COVER_ANALYSIS: 'Analyzes cover against genre standards',
  PLOT_HOLE_DETECTOR: 'Flags plot inconsistencies',
  REVIEW_TO_BLURB: 'Pulls quotes from reviews for marketing',
}

export default function ToolsDashboardPage() {
  const { data: session, status } = useSession() || {}
  const router = useRouter()
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  useEffect(() => {
    if (status === 'authenticated') {
      fetchDashboardData()
    }
  }, [status])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/tools/dashboard')
      if (!response.ok) throw new Error('Failed to fetch data')
      const result = await response.json()
      setData(result)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      toast({
        title: 'Error',
        description: 'Failed to load dashboard data',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleToolUse = async (toolId: string) => {
    try {
      const response = await fetch('/api/tools/dashboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toolId }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to use tool')
      }

      toast({
        title: 'Success',
        description: `Tool activated! ${result.pointsSpent} citations spent.`,
      })

      fetchDashboardData()
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
    }
  }

  if (loading || !data) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64" role="status">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" aria-hidden="true" />
          <span className="sr-only">Loading dashboard...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">AI Tools Dashboard</h1>
          <p className="text-muted-foreground">Analytics & marketplace for AI-powered tools</p>
        </div>
        <Button variant="outline" onClick={() => router.push('/dashboard')}>
          Back to Dashboard
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Citations Balance</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.user.citationBalance}</div>
            <p className="text-xs text-muted-foreground">
              Level {data.user.level}: {data.user.levelName}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.stats.totalReviews}</div>
            <p className="text-xs text-muted-foreground">
              {data.user.reviewCount} reviews written
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <Flame className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.user.streakDays} days</div>
            <p className="text-xs text-muted-foreground">
              Keep logging in daily!
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.badges.length}</div>
            <p className="text-xs text-muted-foreground">
              Achievements unlocked
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Level Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Level Progress</CardTitle>
          <CardDescription>
            Progress to {data.user.level < 5 ? 'next level' : 'max level reached'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Level {data.user.level}: {data.user.levelName}</span>
            <span>{data.user.citationBalance} / {data.stats.nextLevelThreshold} citations</span>
          </div>
          <Progress value={data.stats.progressToNextLevel} className="h-2" />
          {data.user.levelBadge && (
            <Badge variant="secondary" className="mt-2">
              <Star className="h-3 w-3 mr-1" />
              {data.user.levelBadge}
            </Badge>
          )}
        </CardContent>
      </Card>

      {/* AI Tools Marketplace */}
      <Card>
        <CardHeader>
          <CardTitle>AI Tools Marketplace</CardTitle>
          <CardDescription>Spend your citations on AI-powered tools (Coming Soon)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.tools.map((tool) => {
              const Icon = TOOL_ICONS[tool.id] || FileText
              return (
                <Card key={tool.id} className={!tool.available ? 'opacity-60' : ''}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Icon className="h-6 w-6 text-primary" />
                      <Badge variant={tool.available ? 'default' : 'secondary'}>
                        {tool.cost} citations
                      </Badge>
                    </div>
                    <CardTitle className="text-base">{tool.name}</CardTitle>
                    <CardDescription className="text-xs">
                      {TOOL_DESCRIPTIONS[tool.id]}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      className="w-full"
                      disabled={!tool.available}
                      onClick={() => handleToolUse(tool.id)}
                      variant={tool.available ? 'default' : 'outline'}
                    >
                      {tool.available ? 'Use Tool (Placeholder)' : 'Insufficient Citations'}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest citation-earning actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.recentActivities.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No recent activity
              </p>
            ) : (
              data.recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <div>
                      <p className="text-sm font-medium">
                        {activity.activityType.split('_').join(' ')}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(activity.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline">+{activity.pointsEarned} citations</Badge>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
