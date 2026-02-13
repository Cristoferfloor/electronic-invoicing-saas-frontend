import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { TokenService } from '../services/token.service';

export const publicGuard: CanActivateFn = (route, state) => {
    const tokenService = inject(TokenService);
    const router = inject(Router);

    if (tokenService.hasToken()) {
        router.navigate(['/dashboard']);
        return false;
    }

    return true;
};
