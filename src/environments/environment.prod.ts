import { Environment } from './environment.model';

export const environment: Environment = {
  name: 'production',
  production: true,
  api: {
    httpsBaseUrl: 'https://api.fulldev.dev/api',
    version: 'v1',
  },
  featureFlags: {},
};
