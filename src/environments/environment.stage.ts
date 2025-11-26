import { Environment } from './environment.model';

export const environment: Environment = {
  name: 'stage',
  production: true,
  api: {
    baseUrl: 'https://stage-api.fulldev.dev',
    version: 'v1'
  },
  featureFlags: {},
};
