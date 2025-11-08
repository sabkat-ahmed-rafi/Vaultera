import { Request, Response } from 'express'
import { createPaddleCheckout, verifyPaddleWebhook } from '../service/paddleService'
import { config } from '../config/config'
import { prisma } from '../config/prismaClient'


export const createCheckout = async (req: Request, res: Response): Promise<void> => {
  const { type } = req.params // 'subscription' | 'lifetime'
  if(!req.user?.email || !req.user?.id) { res.status(401).json({ message: 'unauthorized' }); return }

  const priceId = type === 'subscription' ? config.paddle_price_subscription : config.paddle_price_lifetime
  if(!priceId) { res.status(500).json({ message: 'price not configured' }); return }

  const successUrl = `${config.frontend}/pricing?checkout=success`
  const cancelUrl = `${config.frontend}/pricing?checkout=cancel`

  const checkout = await createPaddleCheckout({
    priceId,
    customerEmail: req.user.email,
    customerId: req.user.id,
    successUrl,
    cancelUrl,
    metadata: { userId: req.user.id }
  })

  res.json({ url: checkout?.data?.url ?? checkout?.url })
}

export const webhook = async (req: Request, res: Response): Promise<void> => {
  const signature = req.headers['paddle-signature'] as string | undefined
  const rawBody = (req as any).rawBody ?? JSON.stringify(req.body)
  const ok = await verifyPaddleWebhook(rawBody, signature)
  if(!ok) { res.status(400).json({ message: 'invalid signature' }); return }

  const event = req.body

  try {
    // Handle events: transaction.completed, subscription.created/updated, etc.
    if(event?.event_type === 'transaction.completed') {
      const isSubscription = !!event?.data?.items?.[0]?.price?.billing_cycle
      const userId = event?.data?.custom_data?.userId as string | undefined
      if(userId) {
        await prisma.user.update({
          where: { id: userId },
          data: {
            paid: true,
            paymentType: isSubscription ? 'subscription' : 'one_time',
            paddleCustomerId: event?.data?.customer_id ?? null,
            paddleSubscriptionId: isSubscription ? (event?.data?.subscription_id ?? null) : null,
            subscriptionStatus: isSubscription ? 'active' : null,
          }
        })
      }
    }
  } catch (e) {
    // swallow to not leak info
  }
  res.json({ received: true })
}


