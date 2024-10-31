import type { NextFunction, Request, Response } from 'express';
import { NotFoundError } from '#shared/errors/index.js';

class EndpointNotFoundError extends NotFoundError {}

export const endpointNotFoundMiddleware = (
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  next(new EndpointNotFoundError('Endpoint not found'));
};
