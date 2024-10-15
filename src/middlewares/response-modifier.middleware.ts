import type { NextFunction, Request, Response } from 'express';

export const responseModifierMiddleware = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  const originalSendJson = res.json;

  res.json = function (body: unknown): Response {
    res.locals['responseBody'] = body;
    return originalSendJson.call(this, body);
  };

  next();
};
