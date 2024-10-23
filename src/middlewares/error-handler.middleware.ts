import type { NextFunction, Request, Response } from 'express';
import type { HttpError } from '#shared/errors/http.error.js';
import { InternalServerError } from '#shared/errors/index.js';
import { isHttpError } from '#shared/errors/type-guards.js';

export const errorHandlerMiddleware = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const httpError: HttpError = isHttpError(error)
    ? error
    : new InternalServerError(error.message, error);

  httpError.saveDebugInfoToResponseLocals(res);

  res.status(httpError.statusCode).json(httpError);
};
