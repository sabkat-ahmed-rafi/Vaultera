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



export default app;