import type { NextFunction, Request, Response } from 'express';
import { jwtService } from '#services/jwt/jwt.service.js';
import { UnauthorizedError } from '#shared/errors/index.js';
import { to } from '#shared/utils/to.js';

export const authenticateUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authToken: string | undefined =
    req.headers.authorization?.split(' ')[1];

  if (!authToken) return next(new UnauthorizedError());

  const [error, tokenPayload] = await to(() =>
    jwtService.verifyToken<{ id: string; email: string }>(authToken)
  );

  if (error) return next(error);

  res.locals['userId'] = tokenPayload.id;

  next();
};
