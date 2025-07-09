import express from 'express';
import cors from 'cors';
import { config } from './config/config';
import userRoutes from './routes/userRoutes';
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
app.use('/api', userRoutes);

export default app;