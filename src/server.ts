import process from 'node:process';
import express, { type Express } from 'express';
import type { Mongoose } from 'mongoose';
import { config } from '#config/index.js';
import {
  configureErrorHandlers,
  configureMiddlewares
} from '#middlewares/index.js';
import { configureRouters } from '#routers/index.js';
import { cliLoggerService } from '#services/logger/index.js';
import { to } from '#shared/utils/to.js';
import { mongooseConnect } from './database/mongoose-connect.js';

let [error] = await to<Mongoose>(mongooseConnect);

if (error) {
  cliLoggerService.error(String(error));
  process.exit(1);
}

const app: Express = express();

configureMiddlewares(app);

configureRouters(app);

configureErrorHandlers(app);

[error] = await to(() => {
  const { port, baseUrl } = config.server;

  app.listen(port, () => {
    cliLoggerService.info(`Server started on ${baseUrl}:${port}`);
  });
});

if (error) {
  cliLoggerService.error(error.toString());
  process.exit(1);
}
