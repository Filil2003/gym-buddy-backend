import type { EnvironmentConfig } from '../types/types.js';

export const developmentConfig: EnvironmentConfig = {
  server: {
    baseUrl: 'http://dev.localhost',
    port: 3000
  }
};
