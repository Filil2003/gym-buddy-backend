import type { NextFunction, Request, Response } from 'express';
import type { User } from '#models/user/index.js';
import { userService } from '#services/user/user.service.js';
import { ConflictError } from '#shared/errors/index.js';
import { HttpStatusCode } from '#shared/http/enums/index.js';
import { to } from '#shared/utils/to.js';

export const userController = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};

async function getAllUsers(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const [error, users] = await to(userService.getAllUsers());

  if (error) return next(error);

  res.status(HttpStatusCode.Ok).json(users);
}

async function getUserById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { id } = req.params;

  if (!id) {
    return next(new Error('id is required'));
  }

  const [error, user] = await to(userService.getUserById(id));

  if (error) return next(error);

  res.status(HttpStatusCode.Ok).json(user);
}

async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { email, password } = req.body;

  const [error, user] = await to(userService.createUser(email, password));

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

  res.status(HttpStatusCode.Created).json(user);
}

async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { id } = req.params;
  const updatedFields: User = req.body;

  if (!id) {
    return next(new Error('id is required'));
  }

  const [error, updatedUser] = await to(userService.updateUser(id, updatedFields));

  if (error) return next(error);

  res.status(HttpStatusCode.Ok).json(updatedUser);
}

async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { id } = req.params;

  if (!id) {
    return next(new Error('id is required'));
  }

  const [error] = await to(userService.deleteUser(id));

  if (error) return next(error);

  res.sendStatus(HttpStatusCode.NoContent);
}
