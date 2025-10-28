import fetch from 'node-fetch'
import { config } from '../config/config'

type CreateCheckoutInput = {
  priceId: string;
  customerEmail: string;
  customerId?: string;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}

interface PaddleCheckoutResponse {
  data?: {
    url?: string;
  };
  url?: string;
}

export const createPaddleCheckout = async (input: CreateCheckoutInput): Promise<PaddleCheckoutResponse> => {
  if(!config.paddle_api_key) throw new Error('Missing Paddle API key')

  const res = await fetch('https://api.paddle.com/checkout-links', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${config.paddle_api_key}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      items: [ { price_id: input.priceId, quantity: 1 } ],
      customer: { email: input.customerEmail },
      success_url: input.successUrl,
      cancel_url: input.cancelUrl,
      custom_data: input.metadata ?? {}
    })
  })

  if(!res.ok) {
    const text = await res.text()
    throw new Error(`Paddle error: ${text}`)
  }
  const data = (await res.json()) as PaddleCheckoutResponse;
  return data;

}

export const verifyPaddleWebhook = async (rawBody: string, signature: string | undefined) => {
  if(!config.paddle_webhook_secret) throw new Error('Missing Paddle webhook secret')
  if(!signature) return false

  // Paddle v2 uses JSON Webhook with HMAC-SHA256 over raw body
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey('raw', enc.encode(config.paddle_webhook_secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify'])
  const ok = await crypto.subtle.verify('HMAC', key, Uint8Array.from(Buffer.from(signature, 'base64')), enc.encode(rawBody))
  return ok
}


