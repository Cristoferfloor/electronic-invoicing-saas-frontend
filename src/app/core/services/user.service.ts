import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = `${environment.apiUrl}/api/users`;

    constructor(private http: HttpClient) { }

    /**
     * Listar usuarios del tenant con filtros
     */
    getUsers(filters: any = {}): Observable<any> {
        let params = new HttpParams();
        Object.keys(filters).forEach(key => {
            if (filters[key]) {
                params = params.append(key, filters[key]);
            }
        });

        return this.http.get<any>(this.apiUrl, { params }).pipe(
            map(res => res.data)
        );
    }

    /**
     * Obtener un usuario por ID
     */
    getUserById(id: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
            map(res => res.data)
        );
    }

    /**
     * Crear nuevo usuario
     */
    createUser(userData: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, userData);
    }

    /**
     * Actualizar usuario existente
     */
    updateUser(id: string, userData: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/${id}`, userData);
    }

    /**
     * Desactivar usuario (soft delete)
     */
    deleteUser(id: string): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`);
    }

    /**
     * Obtener perfil propio
     */
    getProfile(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/profile`).pipe(
            map(res => res.data)
        );
    }

    /**
     * Cambiar propia contraseña
     */
    changePassword(passwords: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/change-password`, passwords);
    }
}
