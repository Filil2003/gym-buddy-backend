import type { NextFunction, Request, Response } from 'express';
import type { WorkoutPlan } from '#models/workout-plan/index.js';
import { workoutPlanService } from '#services/workout-plan/workout-plan.service.js';
import { BadRequestError } from '#shared/errors/index.js';
import { HttpStatusCode } from '#shared/http/enums/index.js';
import { to } from '#shared/utils/to.js';

export const workoutPlanController = {
  getAllWorkoutPlansByUser,
  getWorkoutPlanById,
  createWorkoutPlan,
  updateWorkoutPlan,
  deleteWorkoutPlan
};

async function getAllWorkoutPlansByUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { userId } = req.params;

  if (!userId) return next(new BadRequestError());

  const [error, workoutPlans] = await to(
    workoutPlanService.getAllWorkoutPlansByUser(userId)
  );

  if (error) return next(error);

  res.status(HttpStatusCode.Ok).json(workoutPlans);
}

async function getWorkoutPlanById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { userId, id } = req.params;

  if (!(userId && id)) return next(new BadRequestError());

  const [error, workoutPlan] = await to(
    workoutPlanService.getWorkoutPlanById(userId, id)
  );

  if (error) return next(error);

  res.status(HttpStatusCode.Ok).json(workoutPlan);
}

async function createWorkoutPlan(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { userId } = req.params;
  const workoutPlanData: Partial<Omit<WorkoutPlan, 'userId'>> = req.body;

  if (!userId) return next(new BadRequestError());

  const [error, workoutPlan] = await to(
    workoutPlanService.createWorkoutPlan(userId, workoutPlanData)
  );

  if (error) return next(error);

  res.status(HttpStatusCode.Created).json(workoutPlan);
}

async function updateWorkoutPlan(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { userId, id } = req.params;
  const updatedFields: Partial<Omit<WorkoutPlan, 'userId'>> = req.body;

  if (!(userId && id)) return next(new BadRequestError());

  const [error, updatedWorkoutPlan] = await to(
    workoutPlanService.updateWorkoutPlan(userId, id, updatedFields)
  );

  if (error) return next(error);

  res.status(HttpStatusCode.Ok).json(updatedWorkoutPlan);
}

async function deleteWorkoutPlan(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { userId, id } = req.params;

  if (!(userId && id)) return next(new BadRequestError());

  const [error] = await to(workoutPlanService.deleteWorkoutPlan(userId, id));

  if (error) return next(error);

  res.sendStatus(HttpStatusCode.NoContent);
}
