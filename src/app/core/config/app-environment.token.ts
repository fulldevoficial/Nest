import { InjectionToken } from '@angular/core';
import { Environment } from '@environments/environment.model';

export const APP_ENVIRONMENT = new InjectionToken<Environment>('app.environment');