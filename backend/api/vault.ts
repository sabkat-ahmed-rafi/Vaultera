import express, { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../src/middleware/verifyToken.js';
import { 
  postEmail, putEmail, removeEmail, getEmails 
} from '../src/controllers/emailController.js';
import { 
  getTwoFA, postTwoFA, removeTwoFA 
} from '../src/controllers/twoFAController.js';
import { 
  getPasswords, postPassword, putPassword, removePassword 
} from '../src/controllers/passwordController.js';
import { 
  getNotes, postNote, putNote, removeNote 
} from '../src/controllers/noteController.js';
import { 
  getCards, postCard, putCard, removeCard 
} from '../src/controllers/cardController.js';
import { 
  getBankAccounts, postBankAccount, putBankAccount, removeBankAccount 
} from '../src/controllers/bankAccountController.js';
import { 
  getIdentities, postIdentity, putIdentity, removeIdentity 
} from '../src/controllers/identityController.js';
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

// Attach verifyToken individually for each route
// Password entries
app.get('/vault/passwords', verifyToken, getPasswords);
app.post('/vault/passwords', verifyToken, postPassword);
app.put('/vault/passwords/:id', verifyToken, putPassword);
app.delete('/vault/passwords/:id', verifyToken, removePassword);

// Email entries
app.get('/vault/emails', verifyToken, getEmails);
app.post('/vault/emails', verifyToken, postEmail);
app.put('/vault/emails/:id', verifyToken, putEmail);
app.delete('/vault/emails/:id', verifyToken, removeEmail);

// 2FA entries
app.get('/vault/2fa', verifyToken, getTwoFA);
app.post('/vault/2fa', verifyToken, postTwoFA);
app.delete('/vault/2fa/:id', verifyToken, removeTwoFA);

// Note entries
app.get('/vault/notes', verifyToken, getNotes);
app.post('/vault/notes', verifyToken, postNote);
app.put('/vault/notes/:id', verifyToken, putNote);
app.delete('/vault/notes/:id', verifyToken, removeNote);

// Card entries
app.get('/vault/cards', verifyToken, getCards);
app.post('/vault/cards', verifyToken, postCard);
app.put('/vault/cards/:id', verifyToken, putCard);
app.delete('/vault/cards/:id', verifyToken, removeCard);

// Bank account entries
app.get('/vault/bank-accounts', verifyToken, getBankAccounts);
app.post('/vault/bank-accounts', verifyToken, postBankAccount);
app.put('/vault/bank-accounts/:id', verifyToken, putBankAccount);
app.delete('/vault/bank-accounts/:id', verifyToken, removeBankAccount);

// Identity entries
app.get('/vault/identities', verifyToken, getIdentities);
app.post('/vault/identities', verifyToken, postIdentity);
app.put('/vault/identities/:id', verifyToken, putIdentity);
app.delete('/vault/identities/:id', verifyToken, removeIdentity);

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
