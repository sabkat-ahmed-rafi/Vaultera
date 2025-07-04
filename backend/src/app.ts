import express from 'express';
import cors from 'cors';
import { config } from './config/config';


const app = express();


// Middlewares 
app.use(express.json());
app.use(cors({
    origin: config.frontend,
}))

// Routes


export default app;