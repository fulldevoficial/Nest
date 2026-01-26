import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLogged } from '../interfaces/login.types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';

  private http = inject(HttpClient);

  getUsers(): Observable<UserLogged[]> {
    return this.http.get<UserLogged[]>(this.apiUrl);
  }

  getUserById(id: string): Observable<UserLogged> {
    return this.http.get<UserLogged>(`${this.apiUrl}/${id}`);
  }

  createUser(user: UserLogged): Observable<UserLogged> {
    return this.http.post<UserLogged>(this.apiUrl, user);
  }

  updateUser(id: string, user: UserLogged): Observable<UserLogged> {
    return this.http.put<UserLogged>(`${this.apiUrl}/${id}`, user);
  }

  patchUser(id: string, user: Partial<UserLogged>): Observable<UserLogged> {
    return this.http.patch<UserLogged>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getUserPaginated(page: number, limit: number): Observable<UserLogged[]> {
    return this.http.get<UserLogged[]>(`${this.apiUrl}?_page=${page}&_limit=${limit}`);
  }

  getUsersSorted(field: string, order: 'asc' | 'desc'): Observable<UserLogged[]> {
    return this.http.get<UserLogged[]>(`${this.apiUrl}?_sort=${field}&_order=${order}`);
  }
}
