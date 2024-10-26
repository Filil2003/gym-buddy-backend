import { Router } from 'express';
import { workoutSessionController } from '#controllers/workout-session.controller.js';

export const workoutSessionRouter: Router = Router();

workoutSessionRouter.get(
  '/:workoutPlanId/sessions',
  workoutSessionController.getAllWorkoutSessionsByWorkoutPlan
);

workoutSessionRouter.get(
  '/sessions/:workoutSessionId',
  workoutSessionController.getWorkoutSessionById
);

workoutSessionRouter.post(
  '/:workoutPlanId/sessions',
  workoutSessionController.createWorkoutSession
);

workoutSessionRouter.put(
  '/sessions/:workoutSessionId',
  workoutSessionController.updateWorkoutSession
);

workoutSessionRouter.delete(
  '/sessions/:workoutSessionId',
  workoutSessionController.deleteWorkoutSession
);
