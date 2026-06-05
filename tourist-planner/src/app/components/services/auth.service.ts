import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../environments/environment';
import { UserPublic } from '../models/public';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: UserPublic;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = `${environment.apiUrl}`;
  private readonly tokenKey = 'accessToken';
  private readonly userKey = 'user';

  user = signal<UserPublic | null>(this.loadUser());
  userId = computed(() => this.user()?.id ?? null);

  constructor(private readonly http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/auth/login`,
      { username, password }
    ).pipe(
      tap(response => {
        this.setToken(response.accessToken);
        this.setUser(response.user);
      })
    );
  }

  register(username: string, email: string, password: string): Observable<unknown> {
    return this.http.post(`${this.apiUrl}/users`, { username, email, password });
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.user.set(null);
  }

  // AUTH STATE HELPERS

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUserId(): number | string | null {
    return this.user()?.id ?? null;
  }

  getUsername(): string | null {
    return this.user()?.username ?? null;
  }

  // INTERNAL SETTERS

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private setUser(user: UserPublic): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
    this.user.set(user);
  }

  private loadUser(): UserPublic | null {
    const raw = localStorage.getItem(this.userKey);
    return raw ? JSON.parse(raw) : null;
  }
}
