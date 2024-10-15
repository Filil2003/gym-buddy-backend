import { config } from '@config/index.js';
import { createLogger, format, transports } from 'winston';

const { combine, timestamp, colorize, printf, align } = format;

export const cliLogger = createLogger({
  level: config.logger.level,
  format: combine(
    format((info) => ({ ...info, level: info.level.toUpperCase() }))(),
    align(),
    timestamp({ format: config.logger.timestampFormat }),
    colorize({ level: true, colors: { http: 'cyan' } }),
    printf(
      ({ level, message, timestamp }) => `[${timestamp}] ${level}: ${message}`
    )
  ),
  transports: [new transports.Console()]
});
