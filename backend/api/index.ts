import app from '../src/app.js';
import serverless from 'serverless-http';
import { Request, Response } from 'express';

interface ServerlessOptions {
    request?: (req: Request, res: Response) => void;
    response?: (res: Response) => void;
}

export default serverless(app, {
    request: (req: Request, res: Response): void => {
        // optional: you can log requests
        console.log(req.method, req.url);
    },
    response: (res: Response): void => {
        // optional: after response ends
    },
} as ServerlessOptions);
