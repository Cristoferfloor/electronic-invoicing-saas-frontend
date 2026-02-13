import { User, Tenant } from './user.model';

export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    user: User;
    tenant: Tenant;
    accessToken: string;
    refreshToken: string;
}

export interface RegisterTenantRequest {
    // Company Data
    commercialName: string;
    legalName: string;
    taxId: string;
    address: string;
    email: string;
    phone: string;

    // Admin Data
    firstName: string;
    lastName: string;
    adminEmail: string;
    password: string;
}
