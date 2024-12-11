import { exerciseController } from '#controllers/exercise.controller.js';
import { Router } from 'express';

const exerciseRouter: Router = Router();

exerciseRouter.get('/exercises', exerciseController.getAllExercisesByUserId);

exerciseRouter.get('/exercises/:id', exerciseController.getExerciseById);

exerciseRouter.post('/exercises', exerciseController.createExercise);

exerciseRouter.put('/exercises/:id', exerciseController.updateExercise);

exerciseRouter.delete('/exercises/:id', exerciseController.deleteExercise);

export { exerciseRouter };
