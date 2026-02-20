import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TenantService {
    private apiUrl = `${environment.apiUrl}/tenant`;

    constructor(private http: HttpClient) { }

    /**
     * Obtener datos del tenant actual (empresa)
     */
    getMyTenant(): Observable<any> {
        return this.http.get<any>(this.apiUrl).pipe(
            map(res => res.data)
        );
    }

    /**
     * Actualizar datos básicos de la empresa
     */
    updateTenant(data: any): Observable<any> {
        return this.http.put<any>(this.apiUrl, data).pipe(
            map(res => res.data || res)  // ← Maneja ambos formatos
        );
    }

    /**
     * Actualizar configuración de facturación (SRI)
     */
    updateBillingConfig(data: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/billing-config`, data).pipe(
            map(res => res.data || res)  // ← Maneja ambos formatos
        );
    }

    /**
     * Subir logo de la empresa
     */
    uploadLogo(logoUrl: string): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/upload-logo`, { logoUrl });
    }
}
