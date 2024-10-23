import type { NextFunction, Request, Response } from 'express';
import { NotFoundError } from '#shared/errors/index.js';

class PageNotFoundError extends NotFoundError {}

export const pageNotFoundMiddleware = (
  _req: Request,
  _res: Response,
  _next: NextFunction
) => {
  throw new PageNotFoundError('Page not found');
};
