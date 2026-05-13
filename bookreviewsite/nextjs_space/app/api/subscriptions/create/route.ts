
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || !((session.user as any).id)) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { toolId, toolName, price } = await request.json()

    // Validate required fields
    if (!toolId || !toolName || !price) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create PayPal subscription
    const paypalAuth = Buffer.from(
      `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET_KEY}`
    ).toString('base64')

    // Get PayPal access token
    const tokenResponse = await fetch('https://api.sandbox.paypal.com/v1/oauth2/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${paypalAuth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    })

    const tokenData = await tokenResponse.json()

    if (!tokenResponse.ok) {
      throw new Error('Failed to get PayPal access token')
    }

    // Create subscription plan
    const planResponse = await fetch('https://api.sandbox.paypal.com/v1/billing/plans', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        product_id: 'PROD-' + toolId.toUpperCase(),
        name: toolName,
        description: `Monthly subscription to ${toolName}`,
        status: 'ACTIVE',
        billing_cycles: [
          {
            frequency: {
              interval_unit: 'MONTH',
              interval_count: 1,
            },
            tenure_type: 'REGULAR',
            sequence: 1,
            total_cycles: 0,
            pricing_scheme: {
              fixed_price: {
                value: price.toString(),
                currency_code: 'USD',
              },
            },
          },
        ],
        payment_preferences: {
          auto_bill_outstanding: true,
          setup_fee_failure_action: 'CONTINUE',
        },
      }),
    })

    if (!planResponse.ok) {
      // Plan might already exist, try to create subscription directly
    }

    // Create subscription
    const origin = request.headers.get('origin') || 'http://localhost:3000'
    const subscriptionResponse = await fetch('https://api.sandbox.paypal.com/v1/billing/subscriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        plan_id: 'P-' + toolId.toUpperCase(),
        start_time: new Date(Date.now() + 60000).toISOString(), // Start in 1 minute
        subscriber: {
          email_address: session.user.email,
        },
        application_context: {
          brand_name: 'BookReviewSite',
          locale: 'en-US',
          shipping_preference: 'NO_SHIPPING',
          user_action: 'SUBSCRIBE_NOW',
          payment_method: {
            payer_selected: 'PAYPAL',
            payee_preferred: 'IMMEDIATE_PAYMENT_REQUIRED',
          },
          return_url: `${origin}/subscriptions/success?tool=${toolId}`,
          cancel_url: `${origin}/pricing?cancelled=true`,
        },
      }),
    })

    const subscriptionData = await subscriptionResponse.json()

    if (!subscriptionResponse.ok) {
      console.error('PayPal subscription error:', subscriptionData)
      return NextResponse.json(
        { message: 'Failed to create subscription' },
        { status: 400 }
      )
    }

    // Find approval URL
    const approvalUrl = subscriptionData.links?.find(
      (link: any) => link.rel === 'approve'
    )?.href

    return NextResponse.json({
      subscriptionId: subscriptionData.id,
      approvalUrl,
    })

  } catch (error) {
    console.error('Subscription creation error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
