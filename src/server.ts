import { env } from 'node:process';
import express, { type Express, type Request, type Response } from 'express';

const app: Express = express();
const HOST = env['SERVER_HOST'];
const PORT = env['SERVER_PORT'];

app.get('/', (_req: Request, res: Response): void => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
