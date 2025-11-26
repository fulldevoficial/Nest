import { Environment } from './environment.model';

export const environment: Environment = {
  name: 'production',
  production: true,
  api: {
    baseUrl: 'https://api.fulldev.dev',
    version: 'v1'
  },
  featureFlags: {},
};
