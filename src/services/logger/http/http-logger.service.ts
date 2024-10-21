import { httpLogger } from './http-logger.js';
import {
  type Context,
  formatHttpLoggerMetadata
} from './utils/format-http-logger-metadata.js';

export const httpLoggerService = {
  info: (context: Context) => {
    httpLogger.info('Not used', formatHttpLoggerMetadata(context));
  },
  warn: (context: Context) => {
    httpLogger.warn('Not used', formatHttpLoggerMetadata(context));
  },
  error: (context: Context) => {
    httpLogger.error('Not used', formatHttpLoggerMetadata(context));
  },
  http: (context: Context) => {
    httpLogger.http('Not used', formatHttpLoggerMetadata(context));
  }
};
