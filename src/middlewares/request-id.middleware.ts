import { randomBytes } from 'node:crypto';
import type { NextFunction, Request, Response } from 'express';

export const requestIdMiddleware = (
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  const requestId: string = randomBytes(16).toString('hex');

  res.setHeader('X-Request-Id', requestId);

  next();
};
