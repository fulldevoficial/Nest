import { Environment } from './environment.model';

export const environment: Environment = {
  name: 'stage',
  production: true,
  api: {
    httpsBaseUrl: 'https://stage-api.fulldev.dev/api',
    version: 'v1',
  },
  featureFlags: {},
};
