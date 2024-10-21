import { httpLogger } from './http-logger.js';
import {
  type Context,
  formatHttpLoggerMetadata
} from './utils/format-http-logger-metadata.js';

export const httpLoggerService = {
  info: (context: Context, message = '') => {
    httpLogger.info(message, formatHttpLoggerMetadata(context));
  },
  warn: (context: Context, message = '') => {
    httpLogger.warn(message, formatHttpLoggerMetadata(context));
  },
  error: (context: Context, message = '') => {
    httpLogger.error(message, formatHttpLoggerMetadata(context));
  },
  http: (context: Context, message = '') => {
    httpLogger.http(message, formatHttpLoggerMetadata(context));
  }
};
