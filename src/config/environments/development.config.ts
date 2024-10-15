import { LogLevelEnum } from '../enums/log-level.enum.js';
import type { EnvironmentConfig } from '../types/types.js';

export const developmentConfig: EnvironmentConfig = {
  server: {
    baseUrl: 'http://dev.localhost',
    port: 3000
  },
  logger: {
    level: LogLevelEnum.HTTP,
    timestampFormat: 'YYYY-MM-DD HH:mm:ss'
  }
};
