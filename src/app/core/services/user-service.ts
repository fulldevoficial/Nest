import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { resolveApiBaseUrl } from '../../../environments/environment.utils';
import { UserLogged } from '../interfaces/login.types';

interface ApiUsuario {
  id: string;
  codigoUsuario: number;
  nome: string;
  email: string;
}

export interface CreateUsuarioInput {
  codigoUsuario: number;
  nome: string;
  email: string;
  password: string;
}

export interface UpdateUsuarioInput {
  nome: string;
  email: string;
  password?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${resolveApiBaseUrl(environment)}/usuario`;

  private http = inject(HttpClient);

  getUsers(): Observable<UserLogged[]> {
    return this.http.get<ApiUsuario[]>(this.apiUrl).pipe(map(users => users.map(this.mapToUserLogged)));
  }

  getUserById(id: string): Observable<UserLogged> {
    return this.http.get<ApiUsuario>(`${this.apiUrl}/${id}`).pipe(map(this.mapToUserLogged));
  }

  createUser(input: CreateUsuarioInput): Observable<ApiUsuario> {
    return this.http.post<ApiUsuario>(this.apiUrl, input);
  }

  updateUser(id: string, input: UpdateUsuarioInput): Observable<ApiUsuario> {
    return this.http.put<ApiUsuario>(`${this.apiUrl}/${id}`, input);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  private mapToUserLogged(user: ApiUsuario): UserLogged {
    const name = user.nome || '';
    const email = user.email || '';
    return {
      id: user.id,
      name,
      username: email ? email.split('@')[0] : '',
      email,
      avatar: null,
      role: 'user',
      permissions: [],
      status: {
        isActive: true,
        isVerified: true,
        isBlocked: false,
      },
      profile: {
        firstName: name.split(' ')[0] || name,
        lastName: name.split(' ').slice(1).join(' '),
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
        lastLoginAt: new Date().toISOString(),
        tokenExpiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }
}
