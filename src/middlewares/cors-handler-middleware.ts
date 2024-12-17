import { HttpStatusCode } from '#shared/http/enums/index.js';
import type { Request, Response, NextFunction } from 'express';
import { config } from '#config/index.js';

export const corsHandlerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const origin = req.headers.origin as string;

  if (origin && config.cors.allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization'
    );
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }

  if (req.method === 'OPTIONS') {
    res.sendStatus(HttpStatusCode.NoContent);
    return;
  }

  next();
};
