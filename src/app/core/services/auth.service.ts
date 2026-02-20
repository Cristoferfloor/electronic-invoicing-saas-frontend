import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { tap, catchError, map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
import { LoginRequest, AuthResponse, RegisterTenantRequest } from '../models/auth.model';
import { User, Tenant } from '../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpClient);
    private tokenService = inject(TokenService);
    private router = inject(Router);

    private currentUserSubject = new BehaviorSubject<User | null>(null);
    public currentUser$ = this.currentUserSubject.asObservable();

    private currentTenantSubject = new BehaviorSubject<Tenant | null>(null);
    public currentTenant$ = this.currentTenantSubject.asObservable();

    private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

    private readonly API_URL = `${environment.apiUrl}/auth`;

    constructor() {
        this.checkInitialAuth();
    }

    private checkInitialAuth(): void {
        // Si hay token válido en localStorage, restaurar la sesión
        if (this.tokenService.hasToken()) {
            this.isAuthenticatedSubject.next(true);
            // NO hacer petición al servidor, solo confiar en el token
            // El token fue guardado correctamente al hacer login
        }
    }

    login(credentials: LoginRequest): Observable<AuthResponse> {
        return this.http.post<any>(`${this.API_URL}/login`, credentials).pipe(
            map(response => response.data as AuthResponse),
            tap(response => {
                this.tokenService.saveTokens(response.accessToken, response.refreshToken);
                this.currentUserSubject.next(response.user);
                this.currentTenantSubject.next(response.tenant);
                this.isAuthenticatedSubject.next(true);
            })
        );
    }

    registerTenant(data: RegisterTenantRequest): Observable<AuthResponse> {
        return this.http.post<any>(`${this.API_URL}/register-tenant`, data).pipe(
            map(response => response.data as AuthResponse),
            tap(response => {
                this.tokenService.saveTokens(response.accessToken, response.refreshToken);
                this.currentUserSubject.next(response.user);
                this.currentTenantSubject.next(response.tenant);
                this.isAuthenticatedSubject.next(true);
            })
        );
    }

    logout(): void {
        const refreshToken = this.tokenService.getRefreshToken();
        if (refreshToken) {
            this.http.post(`${this.API_URL}/logout`, { refreshToken })
                .pipe(catchError(() => of(null)))
                .subscribe();
        }
        this.clearLocalSession();
    }

    private clearLocalSession(): void {
        this.tokenService.removeTokens();
        this.currentUserSubject.next(null);
        this.currentTenantSubject.next(null);
        this.isAuthenticatedSubject.next(false);
        this.router.navigate(['/auth/login']);
    }

    refreshToken(): Observable<AuthResponse> {
        const refreshToken = this.tokenService.getRefreshToken();
        if (!refreshToken) {
            return throwError(() => new Error('No refresh token'));
        }

        return this.http.post<any>(`${this.API_URL}/refresh`, { refreshToken }).pipe(
            map(response => response.data as AuthResponse),
            tap(response => {
                this.tokenService.saveTokens(response.accessToken, response.refreshToken);
            }),
            catchError(err => {
                this.clearLocalSession();
                return throwError(() => err);
            })
        );
    }

    getUserProfile(): Observable<User> {
        return this.http.get<any>(`${this.API_URL}/me`).pipe(
            map(response => response.data as User),
            tap(user => {
                this.currentUserSubject.next(user);
                this.isAuthenticatedSubject.next(true);
            })
        );
    }

    get currentUserValue(): User | null {
        return this.currentUserSubject.value;
    }

    get currentTenantValue(): Tenant | null {
        return this.currentTenantSubject.value;
    }

    forgotPassword(email: string): Observable<void> {
        return this.http.post<void>(`${this.API_URL}/forgot-password`, { email });
    }

    resetPassword(token: string, password: string): Observable<void> {
        return this.http.post<void>(`${this.API_URL}/reset-password`, { token, password });
    }
}
