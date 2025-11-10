import express from 'express';
import cors from 'cors';
import { config } from './config/config';
import authRoutes from './routes/authRoute';
import vaultRoutes from './routes/vaultRoute';
import userRoutes from './routes/userRoute';
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

export default app;