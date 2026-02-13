export interface Tenant {
    id: string;
    commercialName: string;
    legalName: string;
    taxId: string;
    address: string;
    phone?: string;
    email: string;
    plan?: string;
    isActive: boolean;
    logoUrl?: string;
    createdAt: string;
    updatedAt: string;
}

export interface User {
    id: string;
    tenantId: string;
    firstName: string;
    lastName: string;
    email: string;
    role: 'ADMIN' | 'USER';
    isActive: boolean;
    lastLogin?: string;
    createdAt: string;
    updatedAt: string;
    tenant?: Tenant;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    totalPages: number;
}
