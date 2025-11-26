import { Environment } from './environment.model';

export const environment: Environment = {
  name: 'development',
  production: false,
  api: {
    baseUrl: 'http://localhost:5046',
    version: 'v1'
  },
  featureFlags: {},
};
