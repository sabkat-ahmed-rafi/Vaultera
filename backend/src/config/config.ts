import dotenv from 'dotenv';
dotenv.config();

export const config = {
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
    frontend: process.env.FRONTEND,
    jwt_secret: process.env.JWT_SECRET, 
    paddle_api_key: process.env.PADDLE_API_KEY,
    paddle_webhook_secret: process.env.PADDLE_WEBHOOK_SECRET,
    paddle_price_subscription: process.env.PADDLE_PRICE_SUBSCRIPTION,
    paddle_price_lifetime: process.env.PADDLE_PRICE_LIFETIME,
};