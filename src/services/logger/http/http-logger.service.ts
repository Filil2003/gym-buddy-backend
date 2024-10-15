import { httpLogger } from './http-logger.js';
import {
  type IContext,
  formatHttpLoggerMetadata
} from './utils/format-http-logger-metadata.js';

export const httpLoggerService = {
  info: (context: IContext, message = '') => {
    httpLogger.info(message, formatHttpLoggerMetadata(context));
  },
  warn: (context: IContext, message = '') => {
    httpLogger.warn(message, formatHttpLoggerMetadata(context));
  },
  error: (context: IContext, message = '') => {
    httpLogger.error(message, formatHttpLoggerMetadata(context));
  },
  http: (context: IContext, message = '') => {
    httpLogger.http(message, formatHttpLoggerMetadata(context));
  }
};
