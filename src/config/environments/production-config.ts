import { env } from 'node:process';
import { LogLevelEnum } from '../enums/log-level.enum.js';
import type { EnvironmentConfig } from '../types/types.js';
import { constructMongoUri } from '../utils/construct-mongo-uri.js';

const mongoConfig = {
  host: env['MONGO_HOST'] as string,
  port: Number(env['MONGO_PORT']),
  database: env['MONGO_DB'] as string
};

export const productionConfig: EnvironmentConfig = {
  isDebug: false,
  server: {
    baseUrl: env['SERVER_HOST'] as string,
    port: Number(env['SERVER_PORT'])
  },
  cors: {
    allowedOrigins: (env['ALLOWED_ORIGINS'] as string).split(',')
  },
  logger: {
    level: LogLevelEnum.Error,
    timestampFormat: 'YYYY-MM-DD HH:mm:ss'
  },
  jwt: {
    secretKey: env['JWT_SECRET_KEY'] as string,
    expiresIn: env['JWT_EXPIRES_IN'] as string
  },
  mongo: {
    ...mongoConfig,
    uri: constructMongoUri(mongoConfig)
  }
};
