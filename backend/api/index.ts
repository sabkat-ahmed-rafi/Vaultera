import app from '../src/app.js';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { Request, Response } from 'express';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  return new Promise((resolve) => {
    app(req as unknown as Request, res as unknown as Response, () => resolve(undefined));
  });
}
