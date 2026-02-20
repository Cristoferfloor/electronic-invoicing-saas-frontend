import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const tokenService = inject(TokenService);
    const token = tokenService.getAccessToken();

    console.log('🔐 Auth Interceptor - Token:', token ? 'EXISTS' : 'NULL');
    console.log('🔐 Request URL:', req.url);

    if (token) {
        const cloned = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('✅ Authorization header added');
        return next(cloned);
    }

    console.log('⚠️ No token found');
    return next(req);
};
