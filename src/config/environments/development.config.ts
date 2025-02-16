import { LogLevelEnum } from '../enums/log-level.enum.js';
import type { EnvironmentConfig } from '../types/types.js';
import { constructMongoUri } from '../utils/construct-mongo-uri.js';

const mongoConfig = {
  host: '127.0.0.1',
  port: 27017,
  database: 'test'
};

export const developmentConfig: EnvironmentConfig = {
  isDebug: true,
  server: {
    baseUrl: 'http://dev.localhost',
    port: 8080
  },
  cors: {
    allowedOrigins: ['http://localhost:5173', 'http://localhost:4173', 'http://192.168.0.26:5173']
  },
  logger: {
    level: LogLevelEnum.Http,
    timestampFormat: 'YYYY-MM-DD HH:mm:ss'
  },
  jwt: {
    secretKey: 'secret',
    expiresIn: '365d'
  },
  mongo: {
    ...mongoConfig,
    uri: constructMongoUri(mongoConfig)
  }
};
