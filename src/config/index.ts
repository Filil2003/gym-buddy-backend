import { env } from 'node:process';
import { EnvironmentEnum } from './enums/environment.enum.js';
import type { EnvironmentConfig } from './types/types.js';

const NODE_ENV = env['NODE_ENV'];
let config: EnvironmentConfig;

switch (NODE_ENV) {
  case EnvironmentEnum.Development: {
    const module = await import('./environments/development.config.js');
    config = module.developmentConfig;
    break;
  }
  case EnvironmentEnum.Production: {
    const module = await import('./environments/production-config.js');
    config = module.productionConfig;
    break;
  }
  default:
    throw new Error(
      `NODE_ENV is '${NODE_ENV}'. Must be one of: ${Object.values(EnvironmentEnum).join(' | ')}.`
    );
}

export { config };
