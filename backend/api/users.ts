import express from 'express';
import { getCurrentUser, updateProfile } from '../src/controllers/userController.js';
import { verifyToken } from '../src/middleware/verifyToken.js';
import { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from '../src/config/config.js';

const app = express();
app.use(express.json());

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: config.frontend,
  credentials: true,
}));

// User routes
app.get('/users/me', verifyToken, getCurrentUser);
app.put('/users/update-profile', verifyToken, updateProfile);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});


interface ErrorHandler extends Error {
    status?: number;
}

// Error handler
app.use((err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
  console.error('Express error:', err);
  if (res.headersSent) return;
  res.status(err?.status || 500).json({ error: err?.message || 'Internal Server Error' });
});

export default app;
