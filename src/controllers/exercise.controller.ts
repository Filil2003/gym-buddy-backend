import type { NextFunction, Request, Response } from 'express';
import type { Exercise } from '#models/exercise/index.js';
import { exerciseService } from '#services/exercise/exercise.service.js';
import { BadRequestError } from '#shared/errors/index.js';
import { HttpStatusCode } from '#shared/http/enums/index.js';
import { to } from '#shared/utils/to.js';

export const exerciseController = {
  getAllExercisesByUser,
  getExerciseById,
  createExercise,
  updateExercise,
  deleteExercise
};

async function getAllExercisesByUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { userId } = req.params;

  if (!userId) return next(new BadRequestError());

  const [error, exercises] = await to(
    exerciseService.getAllExercisesByUser(userId)
  );

  if (error) return next(error);

  res.status(HttpStatusCode.Ok).json(exercises);
}

async function getExerciseById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { userId, id } = req.params;

  if (!(userId && id)) return next(new BadRequestError());

  const [error, exercise] = await to(
    exerciseService.getExerciseById(userId, id)
  );

  if (error) return next(error);

  res.status(HttpStatusCode.Ok).json(exercise);
}

async function createExercise(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { userId } = req.params;
  const exerciseData: Partial<Omit<Exercise, 'userId'>> = req.body;

  if (!userId) return next(new BadRequestError());

  const [error, exercise] = await to(
    exerciseService.createExercise(userId, exerciseData)
  );

  if (error) return next(error);

  res.status(HttpStatusCode.Created).json(exercise);
}

async function updateExercise(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { userId, id } = req.params;
  const updatedFields: Partial<Omit<Exercise, 'userId'>> = req.body;

  if (!(userId && id)) return next(new BadRequestError());

  const [error, updatedExercise] = await to(
    exerciseService.updateExercise(userId, id, updatedFields)
  );

  if (error) return next(error);

  res.status(HttpStatusCode.Ok).json(updatedExercise);
}

async function deleteExercise(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { userId, id } = req.params;

  if (!(userId && id)) return next(new BadRequestError());

  const [error] = await to(exerciseService.deleteExercise(userId, id));

  if (error) return next(error);

  res.sendStatus(HttpStatusCode.NoContent);
}
