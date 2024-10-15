import { env } from 'node:process';
import { EnvironmentEnum } from './enums/environment.enum.js';
import type { EnvironmentConfig } from './types/types.js';

const NODE_ENV = env['NODE_ENV'];
let config: EnvironmentConfig;

switch (NODE_ENV) {
  case EnvironmentEnum.DEVELOPMENT: {
    const module = await import('./environments/development.config.js');
    config = module.developmentConfig;
    break;
  }
  default:
    throw new Error(
      `NODE_ENV is '${NODE_ENV}'. Must be one of: ${Object.values(EnvironmentEnum).join(' | ')}.`
    );
}

export { config };
