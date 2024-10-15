import { config } from '@config/index.js';
import { randomBytes } from 'node:crypto';
import { env, pid } from 'node:process';
import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';

const { combine, timestamp, json, printf } = format;

const generateLogId = (): string => randomBytes(16).toString('hex');

export const httpLogger = createLogger({
  level: config.logger.level,
  format: combine(
    timestamp({ format: config.logger.timestampFormat }),
    json(),
    printf(({ level, message, timestamp, ...metadata }) => {
      const response = {
        appInfo: {
          appVersion: env['npm_package_version'],
          environment: env['NODE_ENV'],
          processId: pid
        },
        level: level.toUpperCase(),
        logId: generateLogId(),
        message,
        metadata,
        timestamp
      };
      return JSON.stringify(response, null, 2);
    })
  ),
  transports: [
    new transports.Console(),
    new transports.DailyRotateFile({
      filename: '%DATE%.log',
      dirname: 'logs',
      auditFile: 'logs/audit.json',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d'
    })
  ]
});
