import { Router } from 'express';
import { workoutSessionController } from '#controllers/workout-session.controller.js';

const workoutSessionRouter: Router = Router({mergeParams: true});

workoutSessionRouter.get(
  '/sessions',
  workoutSessionController.getAllWorkoutSessionsByWorkoutPlanId
);

workoutSessionRouter.get(
  '/sessions/:workoutSessionId',
  workoutSessionController.getWorkoutSessionById
);

workoutSessionRouter.post(
  '/sessions',
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

export { workoutSessionRouter };
