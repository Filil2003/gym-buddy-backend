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
  cors: {
    allowedOrigins: string[];
  };
  logger: {
    level: LogLevelEnum;
    timestampFormat: string;
  };
  jwt: {
    secretKey: string;
    expiresIn: string;
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
