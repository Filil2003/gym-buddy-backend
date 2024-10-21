import { cliLoggerService, httpLoggerService } from '@services/logger/index.js';
import type { NextFunction, Request, Response } from 'express';

export const httpResponseLoggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const start: [number, number] = process.hrtime();

  res.on('finish', (): void => {
    const duration: [number, number] = process.hrtime(start);
    const durationInMs: number = duration[0] * 1000 + duration[1] / 1e6;
    const { method, originalUrl } = req;
    const { statusCode, statusMessage } = res;

    cliLoggerService.http(
      `${method} '${originalUrl}' ${statusCode} ${statusMessage} ${durationInMs.toFixed(3)} ms`
    );

    httpLoggerService.http({ req, res });
  });

  next();
};
