import { Environment } from './environment.model';

export const environment: Environment = {
  name: 'development',
  production: false,
  api: {
    baseUrl: 'http://localhost:3000',
    version: 'v1'
  },
  featureFlags: {},
};
