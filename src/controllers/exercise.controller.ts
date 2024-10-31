import type { NextFunction, Request, Response } from 'express';
import { type ExerciseDocument, ExerciseDto } from '#models/exercise/index.js';
import { exerciseService } from '#services/exercise/exercise.service.js';
import { BadRequestError } from '#shared/errors/index.js';
import { HttpStatusCode } from '#shared/http/enums/index.js';
import { to } from '#shared/utils/to.js';

export const exerciseController = {
  getAllExercisesByUserId,
  getExerciseById,
  createExercise,
  updateExercise,
  deleteExercise
};

async function getAllExercisesByUserId(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { userId } = res.locals;

  const [error, exercises] = await to<ExerciseDocument[]>(() =>
    exerciseService.getAllExercisesByUserId(userId)
  );

  if (error) return next(error);

  res.status(HttpStatusCode.Ok).json(exercises.map(ExerciseDto.fromDocument));
}

async function getExerciseById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { userId } = res.locals;
  const { id: exerciseId } = req.params;

  if (!exerciseId) return next(new BadRequestError());

  const [error, exercise] = await to<ExerciseDocument>(() =>
    exerciseService.getExerciseById(userId, exerciseId)
  );

  if (error) return next(error);

  res.status(HttpStatusCode.Ok).json(ExerciseDto.fromDocument(exercise));
}

async function createExercise(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { userId } = res.locals;
  const exerciseData = req.body;

  const [error, exercise] = await to<ExerciseDocument>(() =>
    exerciseService.createExercise(userId, exerciseData)
  );

  if (error) return next(error);

  res.status(HttpStatusCode.Created).json(ExerciseDto.fromDocument(exercise));
}

async function updateExercise(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { userId } = res.locals;
  const { id: exerciseId } = req.params;
  const updatedFields = req.body;

  if (!exerciseId) return next(new BadRequestError());

  const [error, updatedExercise] = await to<ExerciseDocument>(() =>
    exerciseService.updateExercise(userId, exerciseId, updatedFields)
  );

  if (error) return next(error);

  res.status(HttpStatusCode.Ok).json(ExerciseDto.fromDocument(updatedExercise));
}

async function deleteExercise(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { userId } = res.locals;
  const { id: exerciseId } = req.params;

  if (!exerciseId) return next(new BadRequestError());

  const [error] = await to(() =>
    exerciseService.deleteExercise(userId, exerciseId)
  );

  if (error) return next(error);

  res.sendStatus(HttpStatusCode.NoContent);
}
