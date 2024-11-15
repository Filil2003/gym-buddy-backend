import express, { type Express } from 'express';
import { authenticateUserMiddleware } from './authenticate-user.middleware.js';
import { corsHandlerMiddleware } from './cors-handler-middleware.js';
import { endpointNotFoundMiddleware } from './endpoint-not-found.middleware.js';
import { errorHandlerMiddleware } from './error-handler.middleware.js';
import { httpResponseLoggerMiddleware } from './http-response-logger.middleware.js';
import { requestIdMiddleware } from './request-id.middleware.js';
import { responseModifierMiddleware } from './response-modifier.middleware.js';

export function configureMiddlewares(app: Express) {
  app.disable('x-powered-by');
  app.use(corsHandlerMiddleware);
  app.use(express.json());
  app.use(requestIdMiddleware);
  app.use(responseModifierMiddleware);
  app.use(httpResponseLoggerMiddleware);
  app.use('/api', authenticateUserMiddleware);
}

export function configureErrorHandlers(app: Express) {
  app.all('*', endpointNotFoundMiddleware);
  app.use(errorHandlerMiddleware);
}
