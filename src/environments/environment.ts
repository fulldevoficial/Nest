import { Environment } from './environment.model';

export const environment: Environment = {
  name: 'development',
  production: false,
  api: {
    httpBaseUrl: 'http://localhost:5046/api',
    httpsBaseUrl: 'https://localhost:7030/api',
    version: 'v1',
  },
  featureFlags: {},
};
