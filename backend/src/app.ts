import express from 'express';
import cors from 'cors';
import { config } from './config/config';
import authRoutes from './routes/authRoute';
import vaultRoutes from './routes/vaultRoute';
import paddleRoutes from './routes/paddleRoute';
import cookieParser from 'cookie-parser';


const app = express();


// Middlewares 
app.use(cookieParser())
// capture raw body for Paddle webhook verification
app.use((req, res, next) => {
    let data = ''
    req.on('data', (chunk) => { data += chunk })
    req.on('end', () => {
        (req as any).rawBody = data
        try { req.body = data ? JSON.parse(data) : {} } catch { req.body = {} }
        next()
    })
})
app.use(cors({
    origin: config.frontend,
    credentials: true,
}))

// Routes
app.use('/api', authRoutes);
app.use('/api', vaultRoutes);
app.use('/api', paddleRoutes);

export default app;