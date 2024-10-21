import { randomBytes } from 'node:crypto';
import { config } from '@config/index.js';
import { isHttpError } from '@shared/errors/type-guards.js';
import type { DebugInfo, HttpResponseBody } from '@shared/http/types/index.js';
import type { NextFunction, Request, Response } from 'express';

/**
 * Middleware for formatting the response and saving it for subsequent logging.
 *
 * This middleware serves two purposes:
 * 1. It formats the response body for the client.
 * 2. It stores the formatted response body for logging it in the 'httpResponseLoggerMiddleware'.
 *
 * @see httpResponseLoggerMiddleware
 */
export const responseModifierMiddleware = (
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Generate a unique request ID for tracking it in logs file
  const requestId: string = randomBytes(16).toString('hex');

  const originalSendJson = res.json.bind(res);

  res.json = (body: unknown): Response => {
    const debugInfo: DebugInfo | undefined = config.isDebug
      ? res.locals['debugInfo']
      : undefined;

    // Construct the final response body to be sent to the client
    const responseBody: HttpResponseBody = {
      requestId,
      ...(isHttpError(body) ? { error: body } : { data: body }),
      ...(debugInfo && { debugInfo: debugInfo })
    };

    /**
     * Save the response body for logging it in the 'httpResponseLoggerMiddleware'
     * @see {httpResponseLoggerMiddleware}
     */
    res.locals['responseBody'] = responseBody;

    return originalSendJson(responseBody);
  };

  next();
};
