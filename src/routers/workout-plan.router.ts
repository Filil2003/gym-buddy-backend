import { Router } from 'express';
import { workoutPlanController } from '#controllers/workout-plan.controller.js';
import { workoutSessionRouter } from './workout-session.router.js';

const workoutPlanRouter: Router = Router();

workoutPlanRouter.get(
  '/workout-plans',
  workoutPlanController.getAllWorkoutPlansByUserId
);

workoutPlanRouter.get(
  '/workout-plans/:id',
  workoutPlanController.getWorkoutPlanById
);

workoutPlanRouter.post(
  '/workout-plans',
  workoutPlanController.createWorkoutPlan
);

workoutPlanRouter.put(
  '/workout-plans/:id',
  workoutPlanController.updateWorkoutPlan
);

workoutPlanRouter.delete(
  '/workout-plans/:id',
  workoutPlanController.deleteWorkoutPlan
);

workoutPlanRouter.use('/workout-plans/:id', workoutSessionRouter);

export { workoutPlanRouter };
