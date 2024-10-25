import { Router } from 'express';
import { workoutPlanController } from '#controllers/workout-plan.controller.js';

const workoutPlanRouter: Router = Router();

workoutPlanRouter.get(
  '/users/:userId/workout-plans',
  workoutPlanController.getAllWorkoutPlansByUser
);

workoutPlanRouter.get(
  '/users/:userId/workout-plans/:id',
  workoutPlanController.getWorkoutPlanById
);

workoutPlanRouter.post(
  '/users/:userId/workout-plans',
  workoutPlanController.createWorkoutPlan
);

workoutPlanRouter.put(
  '/users/:userId/workout-plans/:id',
  workoutPlanController.updateWorkoutPlan
);

workoutPlanRouter.delete(
  '/users/:userId/workout-plans/:id',
  workoutPlanController.deleteWorkoutPlan
);

export { workoutPlanRouter };
