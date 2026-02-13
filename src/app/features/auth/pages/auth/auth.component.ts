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
                this.error = err.message || 'Error al iniciar sesión';
                this.loading = false;
            }
        });
    }
}
