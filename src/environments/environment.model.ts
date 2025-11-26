export type EnvironmentName = 'development' | 'stage' | 'production';

export interface ApiConfig {
  baseUrl: string;
  version: string;
}

export interface Environment {
  name: EnvironmentName;
  production: boolean;
  api: ApiConfig;
  featureFlags?: object;
}
