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
app.use('/auth', authRoutes);
app.use('/vault', vaultRoutes);
app.use('/users', userRoutes);

app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

interface AppError {
    status?: number;
    message?: string;
    [key: string]: unknown;
}

app.use((err: unknown, req: Request, res: Response, next: NextFunction): void => {
    console.error('Express error:', err);
    if (res.headersSent) return; // prevent hanging
    const appErr = err as AppError;
    res.status(appErr?.status || 500).json({ error: appErr?.message || 'Internal Server Error' });
});


export default app;