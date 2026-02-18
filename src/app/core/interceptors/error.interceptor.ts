import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 401 && !req.url.includes('auth/login') && !req.url.includes('auth/refresh')) {
                return authService.refreshToken().pipe(
                    switchMap(() => {
                        // Reintentar la petición original con el nuevo token
                        // El authInterceptor se encargará de poner el nuevo token si recargamos la app,
                        // pero para esta petición específica necesitamos clonarla de nuevo o confiar en que el siguiente interceptor lo haga.
                        // En Angular 17+, al reintentar pasará de nuevo por toda la cadena si usamos HttpClient.
                        // Para simplificar, si falla el refresh, el authService ya desloguea.
                        return next(req);
                    }),
                    catchError((refreshError) => {
                        authService.logout();
                        return throwError(() => refreshError);
                    })
                );
            }

            const errorResponse = error.error || { message: 'Ocurrió un error inesperado' };
            return throwError(() => errorResponse);
        })
    );
};
