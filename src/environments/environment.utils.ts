import { Environment } from './environment.model';

export function resolveApiBaseUrl(environment: Environment): string {
  if (typeof window !== 'undefined') {
    const isHttps = window.location.protocol === 'https:';

    if (isHttps && environment.api.httpsBaseUrl) {
      return environment.api.httpsBaseUrl;
    }

    if (!isHttps && environment.api.httpBaseUrl) {
      return environment.api.httpBaseUrl;
    }
  }

  return (
    environment.api.httpsBaseUrl ||
    environment.api.httpBaseUrl ||
    environment.api.baseUrl ||
    ''
  );
}
