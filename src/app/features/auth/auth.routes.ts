import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/auth/auth.component').then(m => m.AuthComponent)
    },
    {
        path: 'login',
        redirectTo: '',
        pathMatch: 'full'
    },
    {
        path: 'register-tenant',
        loadComponent: () => import('./pages/register-tenant/register-tenant.component').then(m => m.RegisterTenantComponent)
    },
    {
        path: 'forgot-password',
        loadComponent: () => import('./pages/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
    },
    {
        path: 'reset-password',
        loadComponent: () => import('./pages/reset-password/reset-password.component').then(m => m.ResetPasswordComponent)
    }
];
