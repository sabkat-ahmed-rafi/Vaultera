import express, { NextFunction, Request, Response } from 'express';
import { 
    checkUserVaultKeyInfo,
    createUser,
    loginUser,
    checkSession,
    removeJwt,
    setJwt 
} from '../src/controllers/authController.js';
import { verifyToken } from '../src/middleware/verifyToken.js';

const app = express();
app.use(express.json());

// User Authentication
app.post('/auth/sign-up', createUser);
app.post('/auth/sign-in', loginUser);
app.get('/auth/users/:email/vault-key-info', checkUserVaultKeyInfo);

// JWT Session Handling
app.post('/auth/set-jwt', setJwt);
app.post('/auth/remove-jwt', removeJwt);
app.get('/auth/session', verifyToken, checkSession);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error handler
interface ErrorHandler extends Error {
    status?: number;
}

app.use((err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
    console.error('Express error:', err);
    if (res.headersSent) return;
    res.status(err?.status || 500).json({ error: err?.message || 'Internal Server Error' });
});

export default app;
