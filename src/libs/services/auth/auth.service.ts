import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api/auth'; // Adjust if needed
  private reloadRoutesSubject = new Subject<void>();
  reloadRoutes$ = this.reloadRoutesSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        // Handle storing token / setting auth state
        localStorage.setItem('access_token', response.token);
        this.isAuthenticatedSubject.next(true);
        this.triggerReloadRoutes();
      })
    );
  }

  register(user: { email: string; password: string; username?: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.isAuthenticatedSubject.next(false);
    this.triggerReloadRoutes();
  }

  triggerReloadRoutes(): void {
    this.reloadRoutesSubject.next();
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
