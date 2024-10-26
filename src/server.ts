import { workoutSessionRouter } from '#routers/workout-session.router.js';
import express, { type Express, type Request, type Response } from 'express';
import { config } from '#config/index.js';
import {
  errorHandlerMiddleware,
  httpResponseLoggerMiddleware,
  pageNotFoundMiddleware,
  requestIdMiddleware,
  responseModifierMiddleware
} from '#middlewares/index.js';
import {
  exerciseRouter,
  userRouter,
  workoutPlanRouter
} from '#routers/index.js';
import { cliLoggerService } from '#services/logger/index.js';
import { mongooseConnect } from './database/mongoose-connect.js';

const PORT = config.server.port;
const BASE_URL = config.server.baseUrl;

await mongooseConnect();

const app: Express = express();

app.disable('x-powered-by');
app.use(express.json());
app.use(requestIdMiddleware);
app.use(responseModifierMiddleware);
app.use(httpResponseLoggerMiddleware);

app.get('/', (_req: Request, res: Response): void => {
  res.send('Hello World!');
});

app.use('/api', userRouter);
app.use('/api', exerciseRouter);
app.use('/api', workoutPlanRouter);
app.use('/api', workoutSessionRouter);

app.all('*', pageNotFoundMiddleware);

app.use(errorHandlerMiddleware);

try {
  app.listen(PORT, () => {
    cliLoggerService.info(`Server started on ${BASE_URL}:${PORT}`);
  });
} catch (error: unknown) {
  if (error instanceof Error) cliLoggerService.error(error.message);
}
