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
app.use(authRoutes);
app.use(vaultRoutes);
app.use(userRoutes);

// ❗ Catch-all route for undefined endpoints
app.use((req: Request, res: Response) => {
    res.status(404).json({ error: 'Not Found' });
});

// ❗ Error-handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error('Express error:', err);  // Logs to Vercel
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({ error: message });
});

export default app;