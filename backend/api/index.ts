import type { VercelRequest, VercelResponse } from '@vercel/node';
import app from '../src/app.js';

// Wrap Express app for Vercel serverless function
export default async function handler(req: VercelRequest, res: VercelResponse) {
  return new Promise<void>((resolve, reject) => {
    // Express app expects (req, res, next)
    app(req as any, res as any, (err?: any) => {
      if (err) {
        console.error('Express error in Vercel wrapper:', err);
        if (!res.headersSent) res.status(500).json({ error: err.message || 'Internal Server Error' });
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
