import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { RegisterTenantFormComponent } from '../../components/register-tenant-form/register-tenant-form.component';

@Component({
  selector: 'app-register-tenant',
  standalone: true,
  imports: [CommonModule, RouterModule, RegisterTenantFormComponent],
  templateUrl: './register-tenant.component.html',
  styleUrl: './register-tenant.component.scss'
})
export class RegisterTenantComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  loading = false;
  error = '';

  onRegister(data: any) {
    this.loading = true;
    this.error = '';

    this.authService.registerTenant(data).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        // Si el servidor envía detalles de validación, los mostramos
        if (err.errors && Array.isArray(err.errors)) {
          this.error = 'Errores de validación: ' + err.errors.map((e: any) => `${e.field}: ${e.message}`).join(', ');
        } else {
          this.error = err.message || 'Error al registrar empresa';
        }
        this.loading = false;
        console.error('Error de registro:', err);
      }
    });
  }
}
