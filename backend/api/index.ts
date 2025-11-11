import app from '../src/app.js';  // your main Express app
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default (req: VercelRequest, res: VercelResponse) => {
  app(req as any, res as any);
};
