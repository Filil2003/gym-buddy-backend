import { Router } from 'express';
import { workoutPlanController } from '#controllers/workout-plan.controller.js';

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

export { workoutPlanRouter };
