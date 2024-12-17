import { Router } from 'express';
import { workoutSessionController } from '#controllers/workout-session.controller.js';

const workoutSessionRouter: Router = Router({mergeParams: true});

workoutSessionRouter.get(
  '/workout-sessions',
  workoutSessionController.getAllWorkoutSessionsByUserId
);

workoutSessionRouter.get(
  '/workout-sessions/:workoutSessionId',
  workoutSessionController.getWorkoutSessionById
);

workoutSessionRouter.post(
  '/workout-sessions',
  workoutSessionController.createWorkoutSession
);

workoutSessionRouter.put(
  '/workout-sessions/:workoutSessionId',
  workoutSessionController.updateWorkoutSession
);

workoutSessionRouter.delete(
  '/workout-sessions/:workoutSessionId',
  workoutSessionController.deleteWorkoutSession
);

export { workoutSessionRouter };
