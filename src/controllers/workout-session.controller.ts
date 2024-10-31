import type { NextFunction, Request, Response } from 'express';
import {
  type WorkoutSessionDocument,
  WorkoutSessionDto
} from '#models/workout-session/index.js';
import { workoutSessionService } from '#services/workout-session/workout-session.service.js';
import { BadRequestError } from '#shared/errors/index.js';
import { HttpStatusCode } from '#shared/http/enums/index.js';
import { to } from '#shared/utils/to.js';

export const workoutSessionController = {
  getAllWorkoutSessionsByWorkoutPlanId,
  getWorkoutSessionById,
  createWorkoutSession,
  updateWorkoutSession,
  deleteWorkoutSession
};

async function getAllWorkoutSessionsByWorkoutPlanId(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { id: workoutPlanId } = req.params;

  if (!workoutPlanId) return next(new BadRequestError());

  const [error, workoutSessions] = await to<WorkoutSessionDocument[]>(() =>
    workoutSessionService.getAllWorkoutSessionsByWorkoutPlanId(workoutPlanId, [
      'exercises.exercise'
    ])
  );

  if (error) return next(error);

  res
    .status(HttpStatusCode.Ok)
    .json(workoutSessions.map(WorkoutSessionDto.fromDocument));
}

async function getWorkoutSessionById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { workoutSessionId } = req.params;

  if (!workoutSessionId) return next(new BadRequestError());

  const [error, workoutSession] = await to<WorkoutSessionDocument>(() =>
    workoutSessionService.getWorkoutSessionById(workoutSessionId, [
      'exercises.exercise'
    ])
  );

  if (error) return next(error);

  res
    .status(HttpStatusCode.Ok)
    .json(WorkoutSessionDto.fromDocument(workoutSession));
}

async function createWorkoutSession(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { id: workoutPlanId } = req.params;
  if (!workoutPlanId) return next(new BadRequestError());

  const { userId } = res.locals;
  const workoutSessionData = req.body;

  const [error, workoutSession] = await to<WorkoutSessionDocument>(() =>
    workoutSessionService.createWorkoutSession(
      {
        ...workoutSessionData,
        workoutPlanId,
        userId
      },
      ['exercises.exercise']
    )
  );

  if (error) return next(error);

  res
    .status(HttpStatusCode.Created)
    .json(WorkoutSessionDto.fromDocument(workoutSession));
}

async function updateWorkoutSession(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { workoutSessionId } = req.params;
  const updatedFields = req.body;

  if (!workoutSessionId) return next(new BadRequestError());

  const [error, updatedWorkoutSession] = await to<WorkoutSessionDocument>(() =>
    workoutSessionService.updateWorkoutSession(
      workoutSessionId,
      updatedFields,
      ['exercises.exercise']
    )
  );

  if (error) return next(error);

  res
    .status(HttpStatusCode.Ok)
    .json(WorkoutSessionDto.fromDocument(updatedWorkoutSession));
}

async function deleteWorkoutSession(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { workoutSessionId } = req.params;

  if (!workoutSessionId) return next(new BadRequestError());

  const [error] = await to(() =>
    workoutSessionService.deleteWorkoutSession(workoutSessionId)
  );

  if (error) return next(error);

  res.sendStatus(HttpStatusCode.NoContent);
}
