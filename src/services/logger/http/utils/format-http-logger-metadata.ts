import type { Request, Response } from 'express';

export interface IContext {
  req: Request;
  res: Response;
  error?: Error;
}

export const formatHttpLoggerMetadata = (context: IContext) => {
  return {
    request: {
      headers: context.req.headers,
      host: context.req.headers.host,
      protocol: context.req.protocol,
      baseUrl: context.req.baseUrl,
      url: context.req.url,
      method: context.req.method,
      body: context.req.body,
      params: context.req.params,
      query: context.req.query,
      sourceIp: context.req.socket.remoteAddress
    },
    response: {
      headers: context.res.getHeaders(),
      statusCode: context.res.statusCode,
      body: context.res.locals['responseBody']
    },
    error: {
      name: context?.error?.name,
      message: context?.error?.message,
      stackTrace: context?.error?.stack
    }
  };
};
