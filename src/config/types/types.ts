import type { LogLevelEnum } from '../enums/log-level.enum.js';

export interface MongoConfig {
  host: string;
  port: number;
  database: string;
  username?: string;
  password?: string;
  options?: string;
}

export interface EnvironmentConfig {
  isDebug: boolean;
  server: {
    baseUrl: string;
    port: number;
  };
  logger: {
    level: LogLevelEnum;
    timestampFormat: string;
  };
  mongo: {
    host: string;
    port: number;
    database: string;
    username?: string;
    password?: string;
    options?: string;
    uri: string;
  };
}
