import express from 'express';
import cors from 'cors';
import { config } from './config/config';
import userRoutes from './routes/userRoutes';


const app = express();


// Middlewares 
app.use(express.json());
app.use(cors({
    origin: config.frontend,
}))

// Routes
app.use('/api/users', userRoutes);

export default app;