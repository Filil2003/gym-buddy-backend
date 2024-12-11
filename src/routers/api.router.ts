import { exerciseRouter } from '#routers/exercise.router.js';
import { userRouter } from '#routers/user.router.js';
import { workoutPlanRouter } from '#routers/workout-plan.router.js';
import { workoutSessionRouter } from '#routers/workout-session.router.js';
import express, { type Router } from 'express';

const apiRouter: Router = express.Router();

apiRouter.use('', userRouter);
apiRouter.use('', exerciseRouter);
apiRouter.use('', workoutPlanRouter);
apiRouter.use('', workoutSessionRouter);

export { apiRouter };
