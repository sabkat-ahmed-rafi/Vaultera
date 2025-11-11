import express from 'express';
import { getCurrentUser, updateProfile } from '../src/controllers/userController.js';
import { verifyToken } from '../src/middleware/verifyToken.js';
import { NextFunction, Request, Response } from 'express';


const app = express();
app.use(express.json());

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
