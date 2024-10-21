import type { Request, Response } from 'express';

export interface Context {
  req: Request;
  res: Response;
}

export const formatHttpLoggerMetadata = ({ req, res }: Context) => {
  return {
    request: {
      id: res.locals['responseBody'].requestId,
      headers: req.headers,
      host: req.headers.host,
      protocol: req.protocol,
      baseUrl: req.baseUrl,
      url: req.url,
      method: req.method,
      body: req.body,
      params: req.params,
      query: req.query,
      sourceIp: req.socket.remoteAddress
    },
    response: {
      headers: res.getHeaders(),
      statusCode: res.statusCode,
      statusMessage: res.statusMessage,
      body: res.locals['responseBody']
    },
    ...(res.locals['debugInfo'] && {
      debugInfo: res.locals['debugInfo']
    })
  };
};
