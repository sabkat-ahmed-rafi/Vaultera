import express from 'express';
import cors from 'cors';
import { config } from './config/config';
import authRoutes from './routes/authRoute';
import vaultRoutes from './routes/vaultRoute';
import cookieParser from 'cookie-parser';


const app = express();


// Middlewares 
app.use(cookieParser())

app.use(cors({
    origin: config.frontend,
    credentials: true,
}))

// Routes
app.use('/api', authRoutes);
app.use('/api', vaultRoutes);

export default app;