import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { LoginFormComponent } from '../../components/login-form/login-form.component';

@Component({
    selector: 'app-auth',
    standalone: true,
    imports: [CommonModule, RouterModule, LoginFormComponent],
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.scss'
})
export class AuthComponent {
    private authService = inject(AuthService);
    private router = inject(Router);

    loading = false;
    error = '';

    onLogin(credentials: any) {
        this.loading = true;
        this.error = '';

        this.authService.login(credentials).subscribe({
            next: () => {
                this.router.navigate(['/dashboard']);
            },
            error: (err) => {
                if (err.error && Array.isArray(err.error)) {
                    this.error = 'Errores: ' + err.error.map((e: any) => `${e.field}: ${e.message}`).join(', ');
                } else if (err.message) {
                    this.error = err.message;
                } else {
                    this.error = 'Error al iniciar sesión';
                }
                this.loading = false;
            }
        });
    }
}
