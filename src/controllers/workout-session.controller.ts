import type { NextFunction, Request, Response } from 'express';
import type { WorkoutSession } from '#models/workout-session/workout-session.model.js';
import { workoutSessionService } from '#services/workout-session/workout-session.service.js';
import { BadRequestError } from '#shared/errors/index.js';
import { HttpStatusCode } from '#shared/http/enums/index.js';
import { to } from '#shared/utils/to.js';

export const workoutSessionController = {
  getAllWorkoutSessionsByWorkoutPlan,
  getWorkoutSessionById,
  createWorkoutSession,
  updateWorkoutSession,
  deleteWorkoutSession
};

async function getAllWorkoutSessionsByWorkoutPlan(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { workoutPlanId } = req.params;

  if (!workoutPlanId) return next(new BadRequestError());

  const [error, workoutSessions] = await to(
    workoutSessionService.getAllWorkoutSessionsByWorkoutPlan(workoutPlanId)
  );

  if (error) return next(error);

  res.status(HttpStatusCode.Ok).json(workoutSessions);
}

async function getWorkoutSessionById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { workoutSessionId } = req.params;

  if (!workoutSessionId) return next(new BadRequestError());

  const [error, workoutSession] = await to(
    workoutSessionService.getWorkoutSessionById(workoutSessionId)
  );

  if (error) return next(error);

  res.status(HttpStatusCode.Ok).json(workoutSession);
}

async function createWorkoutSession(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { workoutPlanId } = req.params;
  const workoutSessionData: Partial<Omit<WorkoutSession, 'workoutPlanId'>> =
    req.body;

  if (!workoutPlanId) return next(new BadRequestError());

  const [error, workoutSession] = await to(
    workoutSessionService.createWorkoutSession(
      workoutPlanId,
      workoutSessionData
    )
  );

  if (error) return next(error);

  res.status(HttpStatusCode.Created).json(workoutSession);
}

async function updateWorkoutSession(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { workoutSessionId } = req.params;
  const updatedFields: Partial<Omit<WorkoutSession, 'workoutPlanId'>> = req.body;

  if (!workoutSessionId) return next(new BadRequestError());

  const [error, updatedWorkoutSession] = await to(
    workoutSessionService.updateWorkoutSession(workoutSessionId, updatedFields)
  );

  if (error) return next(error);

  res.status(HttpStatusCode.Ok).json(updatedWorkoutSession);
}

async function deleteWorkoutSession(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { workoutSessionId } = req.params;

  if (!workoutSessionId) return next(new BadRequestError());

  const [error] = await to(
    workoutSessionService.deleteWorkoutSession(workoutSessionId)
  );

  if (error) return next(error);

  res.sendStatus(HttpStatusCode.NoContent);
}
