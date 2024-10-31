import type { NextFunction, Request, Response } from 'express';
import type { UserDocument } from '#models/user/index.js';
import { jwtService } from '#services/jwt/jwt.service.js';
import { userService } from '#services/user/user.service.js';
import {
  BadRequestError,
  ConflictError,
  UnauthorizedError
} from '#shared/errors/index.js';
import { HttpStatusCode } from '#shared/http/enums/index.js';
import { to } from '#shared/utils/to.js';

export const authController = {
  register,
  signIn
};

async function register(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { email, password } = req.body;

  if (!(email && password)) return next(new BadRequestError());

  const [error, newUser] = await to<UserDocument>(() =>
    userService.createUser(email, password)
  );

  if (error) {
    if (error instanceof ConflictError) {
      error.saveDebugInfoToResponseLocals(res);

      res.status(HttpStatusCode.Ok).json({
        message: `User with email ${email} already exists`
      });

      return;
    }

    return next(error);
  }

  const authToken: string = jwtService.signToken({ userId: newUser.id });

  res.status(HttpStatusCode.Created).json({ authToken });
}

async function signIn(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { email, password } = req.body;

  if (!(email && password)) return next(new BadRequestError());

  const [error, user] = await to<UserDocument>(() =>
    userService.getUserByEmail(email)
  );

  if (error) return next(error);

  const isPasswordValid: boolean = await user.comparePassword(password);

  if (!isPasswordValid)
    return next(new UnauthorizedError('Invalid credentials'));

  const authToken: string = jwtService.signToken({ userId: user.id });

  res.status(HttpStatusCode.Ok).json({ authToken });
}
