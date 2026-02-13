import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { ForgotPasswordFormComponent } from '../../components/forgot-password-form/forgot-password-form.component';

@Component({
    selector: 'app-forgot-password-page',
    standalone: true,
    imports: [CommonModule, RouterModule, ForgotPasswordFormComponent],
    templateUrl: './forgot-password.component.html',
    styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
    private authService = inject(AuthService);

    loading = false;
    error = '';
    successMessage = '';

    onForgot(email: string) {
        this.loading = true;
        this.error = '';
        this.successMessage = '';

        // Simulando llamada al servicio (que debería existir en authService)
        // @ts-ignore
        if (this.authService.forgotPassword) {
            // @ts-ignore
            this.authService.forgotPassword(email).subscribe({
                next: () => {
                    this.successMessage = 'Se ha enviado un correo con las instrucciones.';
                    this.loading = false;
                },
                error: (err: any) => {
                    this.error = err.message || 'Error al enviar el correo';
                    this.loading = false;
                }
            });
        } else {
            // Mock para demo si no existe el endpoint
            setTimeout(() => {
                this.successMessage = 'Se ha enviado un correo con las instrucciones (Demo).';
                this.loading = false;
            }, 2000);
        }
    }
}
