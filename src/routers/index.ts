import { exerciseRouter } from '#routers/exercise.router.js';
import { userRouter } from '#routers/user.router.js';
import { workoutPlanRouter } from '#routers/workout-plan.router.js';
import { workoutSessionRouter } from '#routers/workout-session.router.js';
import express, { type Express } from 'express';
import { authRouter } from './auth.router.js';

export function configureRouters(app: Express) {
  app.use('/api/auth', authRouter);
  app.use('/api', userRouter);
  app.use('/api', exerciseRouter);
  app.use('/api', workoutPlanRouter);
  app.use('/api', workoutSessionRouter);
  app.use('/api/uploads', express.static('uploads'));
}
