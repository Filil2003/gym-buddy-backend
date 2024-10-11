import express, { type Express, type Request, type Response } from 'express';

const app: Express = express();
const PORT = 3000;

app.get('/', (_req: Request, res: Response): void => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
