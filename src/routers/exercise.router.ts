import { Router } from 'express';
import { exerciseController } from '#controllers/exercise.controller.js';

const exerciseRouter: Router = Router();

exerciseRouter.get('/exercises', exerciseController.getAllExercisesByUserId);

exerciseRouter.get('/exercises/:id', exerciseController.getExerciseById);

exerciseRouter.post('/exercises', exerciseController.createExercise);

exerciseRouter.put('/exercises/:id', exerciseController.updateExercise);

exerciseRouter.delete('/exercises/:id', exerciseController.deleteExercise);

export { exerciseRouter };
