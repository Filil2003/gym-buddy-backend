import { createServer, IncomingMessage, RequestListener, Server, ServerResponse } from 'node:http';

const PORT = 3000;

const requestHandler: RequestListener = (_req: IncomingMessage, res: ServerResponse) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!');
};

const server: Server = createServer(requestHandler);

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
