import { config } from '@config/index.js';
import {
  httpResponseLoggerMiddleware,
  responseModifierMiddleware
} from '@middlewares/index.js';
import { cliLoggerService } from '@services/logger/index.js';
import express, { type Express, type Request, type Response } from 'express';

const app: Express = express();
const BASE_URL = config.server.baseUrl;
const PORT = config.server.port;

app.use(responseModifierMiddleware);
app.use(httpResponseLoggerMiddleware);

app.get('/', (_req: Request, res: Response): void => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  cliLoggerService.info(`Server started on ${BASE_URL}:${PORT}`);
});
