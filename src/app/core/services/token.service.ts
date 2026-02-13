import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class TokenService {
    private readonly ACCESS_TOKEN_KEY = 'auth_access_token';
    private readonly REFRESH_TOKEN_KEY = 'auth_refresh_token';

    constructor() { }

    saveTokens(accessToken: string, refreshToken: string): void {
        localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
        localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
    }

    getAccessToken(): string | null {
        return localStorage.getItem(this.ACCESS_TOKEN_KEY);
    }

    getRefreshToken(): string | null {
        return localStorage.getItem(this.REFRESH_TOKEN_KEY);
    }

    removeTokens(): void {
        localStorage.removeItem(this.ACCESS_TOKEN_KEY);
        localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    }

    decodeToken(token: string): any {
        try {
            return jwtDecode(token);
        } catch (error) {
            return null;
        }
    }

    isTokenExpired(token: string): boolean {
        const decoded: any = this.decodeToken(token);
        if (!decoded || !decoded.exp) {
            return true;
        }
        const currentTime = Math.floor(Date.now() / 1000);
        return decoded.exp < currentTime;
    }

    hasToken(): boolean {
        const token = this.getAccessToken();
        return !!token && !this.isTokenExpired(token);
    }
}
