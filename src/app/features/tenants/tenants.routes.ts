import { Routes } from '@angular/router';

export const TENANT_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/tenant-settings/tenant-settings.component').then(m => m.TenantSettingsComponent)
    },
    {
        path: 'onboarding',
        loadComponent: () => import('./components/onboarding/onboarding-wizard.component').then(m => m.OnboardingWizardComponent)
    }
];
