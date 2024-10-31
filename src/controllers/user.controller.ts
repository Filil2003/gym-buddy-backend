import type { NextFunction, Request, Response } from 'express';
import { type User, type UserDocument, UserDto } from '#models/user/index.js';
import { userService } from '#services/user/user.service.js';
import { HttpStatusCode } from '#shared/http/enums/index.js';
import { to } from '#shared/utils/to.js';

export const userController = {
  updateUser,
  deleteUser
};

async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { userId } = res.locals;
  const updatedFields: User = req.body;

  const [error, updatedUser] = await to<UserDocument>(() =>
    userService.updateUser(userId, updatedFields)
  );

  if (error) return next(error);

  res.status(HttpStatusCode.Ok).json(UserDto.fromDocument(updatedUser));
}

async function deleteUser(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { userId } = res.locals;

  const [error] = await to(() => userService.deleteUser(userId));

  if (error) return next(error);

  res.sendStatus(HttpStatusCode.NoContent);
}
