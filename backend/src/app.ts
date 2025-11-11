import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { config } from './config/config.js';
import authRoutes from './routes/authRoute.js';
import vaultRoutes from './routes/vaultRoute.js';
import userRoutes from './routes/userRoute.js';
import cookieParser from 'cookie-parser';


const app = express();


// Middlewares 
app.use(cookieParser())
app.use(express.json());
app.use(cors({
    origin: config.frontend,
    credentials: true,
}))

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/vault', vaultRoutes);
app.use('/api/users', userRoutes);

app.use((req, res, next) => {
  console.log('👉 Express received:', req.method, req.url);
  next();
});


// Error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction): void => {
    console.error('Express error:', err);
    if (res.headersSent) return;
    const status = typeof err?.status === 'number' ? err.status : 500;
    const message = err?.message || 'Internal Server Error';
    res.status(status).json({ error: message });
});


export default app;