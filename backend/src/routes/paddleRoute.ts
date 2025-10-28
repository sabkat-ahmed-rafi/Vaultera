import { Router } from 'express'
import { verifyToken } from '../middleware/verifyToken'
import { createCheckout, webhook } from '../controllers/paddleController'

const router = Router()

router.post('/paddle/checkout/:type', verifyToken, createCheckout)
// Webhook must receive raw body; ensure body parser keeps it (configure in app.ts if needed)
router.post('/paddle/webhook', webhook)


export default router


