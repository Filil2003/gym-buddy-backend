import type { NextFunction, Request, Response } from 'express';
import {
  type WorkoutPlanDocument,
  WorkoutPlanDto
} from '#models/workout-plan/index.js';
import { workoutPlanService } from '#services/workout-plan/workout-plan.service.js';
import { BadRequestError } from '#shared/errors/index.js';
import { HttpStatusCode } from '#shared/http/enums/index.js';
import { to } from '#shared/utils/to.js';

export const workoutPlanController = {
  getAllWorkoutPlansByUserId,
  getWorkoutPlanById,
  createWorkoutPlan,
  updateWorkoutPlan,
  deleteWorkoutPlan
};

async function getAllWorkoutPlansByUserId(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { userId } = res.locals;

  const [error, workoutPlans] = await to<WorkoutPlanDocument[]>(() =>
    workoutPlanService.getAllWorkoutPlansByUserId(userId, ['exercises'])
  );

  if (error) return next(error);

  res
    .status(HttpStatusCode.Ok)
    .json(workoutPlans.map(WorkoutPlanDto.fromDocument));
}

async function getWorkoutPlanById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { userId } = res.locals;
  const { id: workoutPlanId } = req.params;

  if (!workoutPlanId) return next(new BadRequestError());

  const [error, workoutPlan] = await to<WorkoutPlanDocument>(() =>
    workoutPlanService.getWorkoutPlanById(userId, workoutPlanId, ['exercises'])
  );

  if (error) return next(error);

  res.status(HttpStatusCode.Ok).json(WorkoutPlanDto.fromDocument(workoutPlan));
}

async function createWorkoutPlan(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { userId } = res.locals;
  const workoutPlanData = req.body;

  const [error, workoutPlan] = await to<WorkoutPlanDocument>(() =>
    workoutPlanService.createWorkoutPlan(userId, workoutPlanData, ['exercises'])
  );

  if (error) return next(error);

  res
    .status(HttpStatusCode.Created)
    .json(WorkoutPlanDto.fromDocument(workoutPlan));
}

async function updateWorkoutPlan(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { userId } = res.locals;
  const { id: workoutPlanId } = req.params;
  const updatedFields = req.body;

  if (!workoutPlanId) return next(new BadRequestError());

  const [error, updatedWorkoutPlan] = await to<WorkoutPlanDocument>(() =>
    workoutPlanService.updateWorkoutPlan(userId, workoutPlanId, updatedFields, [
      'exercises'
    ])
  );

  if (error) return next(error);

  res
    .status(HttpStatusCode.Ok)
    .json(WorkoutPlanDto.fromDocument(updatedWorkoutPlan));
}

async function deleteWorkoutPlan(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { userId } = res.locals;
  const { id: workoutPlanId } = req.params;

  if (!workoutPlanId) return next(new BadRequestError());

  const [error] = await to(() =>
    workoutPlanService.deleteWorkoutPlan(userId, workoutPlanId)
  );

  if (error) return next(error);

  res.sendStatus(HttpStatusCode.NoContent);
}
