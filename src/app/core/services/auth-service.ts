import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { resolveApiBaseUrl } from '../../../environments/environment.utils';
import { LoginRequest, LoginResponse, UserLogged } from '../interfaces/login.types';
import { BehaviorSubject, catchError, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

interface LoginApiResponse {
  sucesso: boolean;
  mensagem: string;
  token?: string;
}

interface ApiUsuario {
  id: string;
  codigoUsuario: number;
  nome: string;
  email: string;
}

interface JwtPayload {
  sub?: string;
  usuarioId?: string;
  exp?: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = resolveApiBaseUrl(environment);
  private http = inject(HttpClient);
  private router = inject(Router);

  private currentUserSubject = new BehaviorSubject<UserLogged | null>(null);
  private currentUser$ = this.currentUserSubject.asObservable();

  isAuthenticated = signal<boolean>(false);

  private checkAuth() {
    const token = this.getToken();
    const user = this.getStoredUser();

    if (token && user && !this.isTokenExpired(token)) {
      this.currentUserSubject.next(user);
      this.isAuthenticated.set(true);
    } else {
      this.logout();
    }
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginApiResponse>(`${this.apiUrl}/auth/login`, credentials).pipe(
      switchMap((response) => {
        if (!response.sucesso || !response.token) {
          return throwError(() => new Error(response.mensagem || 'Falha no login'));
        }

        const token = response.token;
        const payload = this.decodeToken(token);

        if (!payload?.usuarioId) {
          const fallbackUser = this.mapToUserLoggedFromToken(payload);
          return of(this.buildLoginResponse(token, fallbackUser, payload));
        }

        return this.http.get<ApiUsuario>(`${this.apiUrl}/usuario/${payload.usuarioId}`).pipe(
          map((user) => this.buildLoginResponse(token, this.mapToUserLogged(user), payload)),
          catchError(() => of(this.buildLoginResponse(token, this.mapToUserLoggedFromToken(payload), payload))),
        );
      }),
      tap((response) => {
        this.saveAuth(response);
        this.currentUserSubject.next(response.user);
        this.isAuthenticated.set(true);
      }),
      catchError((error) => {
        console.error('Erro no login:', error);
        return throwError(() => error);
      }),
    );
  }

  register(data: any): Observable<any> {
    const payload = {
      codigoUsuario: data?.codigoUsuario ?? Date.now(),
      nome: data?.name ?? '',
      email: data?.email ?? '',
      password: data?.password ?? '',
    };

    return this.http.post(`${this.apiUrl}/usuario`, payload).pipe(
      tap((user) => {
        console.log('Usuario criado:', user);
      }),
    );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('current_user');

    this.currentUserSubject.next(null);
    this.isAuthenticated.set(false);

    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getCurrentUser(): UserLogged | null {
    return this.currentUserSubject.value;
  }

  private saveAuth(response: LoginResponse): void {
    localStorage.setItem('access_token', response.accessToken);
    localStorage.setItem('refresh_token', response.refreshToken);
    localStorage.setItem('current_user', JSON.stringify(response.user));
  }

  private getStoredUser(): UserLogged | null {
    const userStr = localStorage.getItem('current_user');
    return userStr ? JSON.parse(userStr) : null;
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = this.decodeToken(token);
      const expiry = (payload?.exp ?? 0) * 1000;
      return Date.now() > expiry;
    } catch {
      return true;
    }
  }

  private decodeToken(token: string): JwtPayload | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        sub: payload.sub,
        usuarioId: payload.usuarioId,
        exp: payload.exp,
      };
    } catch {
      return null;
    }
  }

  private buildLoginResponse(token: string, user: UserLogged, payload: JwtPayload | null): LoginResponse {
    const now = Math.floor(Date.now() / 1000);
    const exp = payload?.exp ?? now + 2 * 60 * 60;

    return {
      accessToken: token,
      refreshToken: '',
      user,
      expiresIn: exp - now,
    };
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

  private mapToUserLoggedFromToken(payload: JwtPayload | null): UserLogged {
    const email = payload?.sub ?? '';
    const name = email ? email.split('@')[0] : 'Usuario';

    return {
      id: payload?.usuarioId ?? '',
      name,
      username: name,
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
        firstName: name,
        lastName: '',
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
