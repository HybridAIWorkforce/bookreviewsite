
'use client'

import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'

interface PayPalSubscribeButtonProps {
  toolId: string
  toolName: string
  price: number
  popular?: boolean
}

export function PayPalSubscribeButton({ toolId, toolName, price, popular }: PayPalSubscribeButtonProps) {
  const { data: session } = useSession() || {}
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async () => {
    if (!session) {
      router.push('/auth/signin')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/subscriptions/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          toolId,
          toolName,
          price
        }),
      })

      const data = await response.json()

      if (data.approvalUrl) {
        window.open(data.approvalUrl, '_blank')
      } else {
        throw new Error('Failed to create subscription')
      }
    } catch (error) {
      toast({
        title: 'Subscription Error',
        description: 'Failed to create subscription. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={handleSubscribe}
      disabled={loading}
      className={`w-full ${popular ? 'bg-primary hover:bg-primary/90' : ''}`}
      size="lg"
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        'Subscribe Now'
      )}
    </Button>
  )
}
