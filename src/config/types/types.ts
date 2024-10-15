import type { LogLevelEnum } from '../enums/log-level.enum.js';

export interface EnvironmentConfig {
  server: {
    baseUrl: string;
    port: number;
  };
  logger: {
    level: LogLevelEnum;
    timestampFormat: string;
  };
}
