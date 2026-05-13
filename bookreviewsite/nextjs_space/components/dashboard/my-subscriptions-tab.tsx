

'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Loader2, Package, ExternalLink } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import { format } from 'date-fns'

interface Subscription {
  id: string
  toolName: string
  paypalSubscriptionId: string | null
  status: 'ACTIVE' | 'CANCELLED' | 'EXPIRED' | 'PENDING'
  monthlyPrice: number
  startDate: string
  endDate: string | null
  createdAt: string
}

export function MySubscriptionsTab() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSubscriptions()
  }, [])

  const fetchSubscriptions = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/subscriptions')
      if (!response.ok) throw new Error('Failed to fetch subscriptions')
      const data = await response.json()
      setSubscriptions(data)
    } catch (error) {
      console.error('Error fetching subscriptions:', error)
      toast({
        title: 'Error',
        description: 'Failed to load your subscriptions',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-500'
      case 'CANCELLED':
        return 'bg-orange-500'
      case 'EXPIRED':
        return 'bg-red-500'
      default:
        return 'bg-yellow-500'
    }
  }

  const handleManageSubscription = () => {
    // Open PayPal subscription management in new tab
    window.open('https://www.paypal.com/myaccount/autopay/', '_blank')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12" role="status">
        <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden="true" /><span className="sr-only">Loading...</span>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Subscriptions</CardTitle>
        <CardDescription>
          Manage your AI tool subscriptions
        </CardDescription>
      </CardHeader>
      <CardContent>
        {subscriptions.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-lg font-semibold mb-2">No subscriptions yet</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe to AI tools to enhance your writing
            </p>
            <Button asChild>
              <a href="/pricing">Browse AI Tools</a>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {subscriptions.map((subscription) => (
              <div
                key={subscription.id}
                className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 border rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{subscription.toolName}</h3>
                    <Badge className={getStatusColor(subscription.status)}>
                      {subscription.status}
                    </Badge>
                  </div>

                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>
                      <span className="font-medium">Price:</span> ${subscription.monthlyPrice}/month
                    </p>
                    <p>
                      <span className="font-medium">Started:</span>{' '}
                      {format(new Date(subscription.startDate), 'MMM d, yyyy')}
                    </p>
                    {subscription.endDate && (
                      <p>
                        <span className="font-medium">Ends:</span>{' '}
                        {format(new Date(subscription.endDate), 'MMM d, yyyy')}
                      </p>
                    )}
                    {subscription.status === 'ACTIVE' && !subscription.endDate && (
                      <p>
                        <span className="font-medium">Next billing:</span>{' '}
                        {format(
                          new Date(
                            new Date(subscription.startDate).setMonth(
                              new Date(subscription.startDate).getMonth() + 1
                            )
                          ),
                          'MMM d, yyyy'
                        )}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  {subscription.status === 'ACTIVE' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleManageSubscription}
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Manage on PayPal
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

