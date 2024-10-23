import { Router } from 'express';
import { exerciseController } from '#controllers/exercise.controller.js';

const exerciseRouter = Router();

exerciseRouter.get(
  '/users/:userId/exercises',
  exerciseController.getAllExercisesByUser
);

exerciseRouter.get(
  '/users/:userId/exercises/:id',
  exerciseController.getExerciseById
);

exerciseRouter.post(
  '/users/:userId/exercises',
  exerciseController.createExercise
);

exerciseRouter.put(
  '/users/:userId/exercises/:id',
  exerciseController.updateExercise
);

exerciseRouter.delete(
  '/user/:userId/exercises/:id',
  exerciseController.deleteExercise
);

export { exerciseRouter };
