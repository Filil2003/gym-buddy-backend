import { constructMongoUri } from '@config/utils/construct-mongo-uri.js';
import { LogLevelEnum } from '../enums/log-level.enum.js';
import type { EnvironmentConfig } from '../types/types.js';

const mongoConfig = {
  host: '127.0.0.1',
  port: 27017,
  database: 'test'
};

export const developmentConfig: EnvironmentConfig = {
  server: {
    baseUrl: 'http://dev.localhost',
    port: 3000
  },
  logger: {
    level: LogLevelEnum.HTTP,
    timestampFormat: 'YYYY-MM-DD HH:mm:ss'
  },
  mongo: {
    ...mongoConfig,
    uri: constructMongoUri(mongoConfig)
  }
};
