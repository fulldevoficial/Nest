import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { LoginRequest, LoginResponse, UserLogged } from '../interfaces/login.types';
import { BehaviorSubject, catchError, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.api.baseUrl}`;
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

  /**
   * Login - Simulando autenticação com JSON Server
   */
  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.get<any[]>(`${this.apiUrl}/users?email=${credentials.email}`).pipe(
      switchMap((users) => {
        if (users.length === 0) {
          return throwError(() => new Error('Usuário não encontrado'));
        }

        const user = users[0];

        if (user.password !== credentials.password) {
          return throwError(() => new Error('Senha incorreta'));
        }

        const response: LoginResponse = {
          accessToken: this.generateToken(user),
          refreshToken: this.generateRefreshToken(),
          user: this.mapToUserLogged(user),
          expiresIn: 3600,
        };

        return of(response);
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
    const newUser = {
      email: data.email,
      password: data.password,
      name: data.name,
      role: 'user',
      avatar: null,
      createdAt: new Date().toISOString(),
    };

    return this.http.post(`${this.apiUrl}/users`, newUser).pipe(
      tap((user) => {
        console.log('Usuário criado:', user);
      }),
    );
  }

  /**
   * Logout
   */
  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('current_user');

    this.currentUserSubject.next(null);
    this.isAuthenticated.set(false);

    this.router.navigate(['/login']);
  }

  /**
   * Verifica se está autenticado
   */
  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  /**
   * Pega o token do localStorage
   */
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  /**
   * Pega o usuário atual
   */
  getCurrentUser(): UserLogged | null {
    return this.currentUserSubject.value;
  }

  /**
   * Salva autenticação no localStorage
   */
  private saveAuth(response: LoginResponse): void {
    localStorage.setItem('access_token', response.accessToken);
    localStorage.setItem('refresh_token', response.refreshToken);
    localStorage.setItem('current_user', JSON.stringify(response.user));
  }

  /**
   * Recupera usuário salvo
   */
  private getStoredUser(): UserLogged | null {
    const userStr = localStorage.getItem('current_user');
    return userStr ? JSON.parse(userStr) : null;
  }

  /**
   * Verifica se o token expirou
   */
  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiry = payload.exp * 1000; // Converter para milliseconds
      return Date.now() > expiry;
    } catch {
      return true;
    }
  }

  /**
   * Gera token fake (simulação)
   */
  private generateToken(user: any): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(
      JSON.stringify({
        userId: user.id,
        email: user.email,
        role: user.role,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600, // 1 hora
      }),
    );
    const signature = btoa('fake-signature');

    return `${header}.${payload}.${signature}`;
  }

  /**
   * Gera refresh token fake
   */
  private generateRefreshToken(): string {
    return btoa(`refresh-${Date.now()}-${Math.random()}`);
  }

  /**
   * Mapeia user do backend para UserLogged
   */
  private mapToUserLogged(user: any): UserLogged {
    return {
      id: user.id,
      name: user.name,
      username: user.email.split('@')[0],
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      permissions: [],
      status: {
        isActive: true,
        isVerified: true,
        isBlocked: false,
      },
      profile: {
        firstName: user.name.split(' ')[0],
        lastName: user.name.split(' ').slice(1).join(' '),
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
        tokenExpiresAt: new Date(Date.now() + 3600000).toISOString(),
      },
      createdAt: user.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }
}
