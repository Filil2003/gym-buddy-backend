import { cliLogger } from './cli-logger.js';

export const cliLoggerService = {
  info: (message: string) => {
    cliLogger.info(message);
  },
  warn: (message: string) => {
    cliLogger.warn(message);
  },
  error: (message: string) => {
    cliLogger.error(message);
  },
  http: (message: string) => {
    cliLogger.http(message);
  }
};
