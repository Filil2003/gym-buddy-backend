import { NotFoundError } from '@shared/errors/index.js';
import type { NextFunction, Request, Response } from 'express';

class PageNotFoundError extends NotFoundError {}

export const pageNotFoundMiddleware = (
  _req: Request,
  _res: Response,
  _next: NextFunction
) => {
  throw new PageNotFoundError('Page not found');
};
