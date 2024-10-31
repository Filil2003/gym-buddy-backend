import type { Express } from 'express';
import { apiRouter } from './api.router.js';
import { authRouter } from './auth.router.js';

export function configureRouters(app: Express) {
  app.use('/auth', authRouter);
  app.use('/api', apiRouter);
}
