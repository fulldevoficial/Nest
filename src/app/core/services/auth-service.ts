import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { LoginRequest, LoginResponse, UserLogged } from '../interfaces/login.types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.api.baseUrl}/api/Auth`;
  private http = inject(HttpClient);

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, data);
  }

  MOCK_USER_LOGGED: UserLogged = {
    id: 'usr_9f3a21',
    name: 'Lucas Pedro',
    username: 'lucaspedro',
    email: 'lucas@fulldev.com.br',

    avatar:
      'https://media.licdn.com/dms/image/v2/D4D03AQF--l8cwavBCQ/profile-displayphoto-crop_800_800/B4DZu10cwyJUAI-/0/1768281987627?e=1770854400&v=beta&t=wdhvnOStRr08FiQJt6cSL-8aK1_jvWlpHOyUTe7dx6o',
    role: 'admin',

    permissions: ['COURSE_CREATE', 'COURSE_EDIT', 'USER_VIEW', 'DASHBOARD_ACCESS'],

    status: {
      isActive: true,
      isVerified: true,
      isBlocked: false,
    },

    profile: {
      firstName: 'Lucas',
      lastName: 'Pedro',
      bio: 'Frontend Dev | Angular | FullDev',
      locale: 'pt-BR',
      timezone: 'America/Sao_Paulo',
    },

    preferences: {
      theme: 'dark',
      notifications: {
        email: true,
        push: false,
        sms: false,
      },
    },

    auth: {
      provider: 'local',
      lastLoginAt: '2026-01-25T12:34:22Z',
      tokenExpiresAt: '2026-01-26T12:34:22Z',
    },

    createdAt: '2025-10-10T14:22:10Z',
    updatedAt: '2026-01-25T12:34:22Z',
  };
}
