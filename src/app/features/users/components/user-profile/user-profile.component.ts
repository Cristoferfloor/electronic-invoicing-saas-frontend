import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../../core/services/user.service';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';

@Component({
    selector: 'app-user-profile',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, CardComponent, ButtonComponent, AlertComponent],
    templateUrl: './user-profile.component.html',
    styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
    private fb = inject(FormBuilder);
    private userService = inject(UserService);

    profileForm: FormGroup;
    passwordForm: FormGroup;
    loading = false;
    successMsg: string | null = null;
    errorMsg: string | null = null;

    constructor() {
        this.profileForm = this.fb.group({
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            email: [{ value: '', disabled: true }]
        });

        this.passwordForm = this.fb.group({
            currentPassword: ['', [Validators.required]],
            newPassword: ['', [Validators.required, Validators.minLength(8)]],
            confirmPassword: ['', [Validators.required]]
        }, { validators: this.passwordMatchValidator });
    }

    ngOnInit(): void {
        this.loadProfile();
    }

    passwordMatchValidator(g: FormGroup) {
        return g.get('newPassword')?.value === g.get('confirmPassword')?.value
            ? null : { mismatch: true };
    }

    loadProfile(): void {
        this.loading = true;
        this.userService.getProfile().subscribe({
            next: (user) => {
                this.profileForm.patchValue(user);
                this.loading = false;
            },
            error: () => {
                this.errorMsg = 'Error al cargar el perfil';
                this.loading = false;
            }
        });
    }

    updateProfile(): void {
        if (this.profileForm.invalid) return;
        this.loading = true;
        this.userService.updateUser('me', this.profileForm.value).subscribe({
            next: () => {
                this.successMsg = 'Perfil actualizado';
                this.loading = false;
                setTimeout(() => this.successMsg = null, 3000);
            },
            error: () => {
                this.errorMsg = 'Error al actualizar perfil';
                this.loading = false;
            }
        });
    }

    changePassword(): void {
        if (this.passwordForm.invalid) return;
        this.loading = true;
        this.userService.changePassword(this.passwordForm.value).subscribe({
            next: () => {
                this.successMsg = 'Contraseña actualizada correctamente';
                this.passwordForm.reset();
                this.loading = false;
                setTimeout(() => this.successMsg = null, 3000);
            },
            error: (err) => {
                this.errorMsg = err.error?.message || 'Error al cambiar contraseña';
                this.loading = false;
            }
        });
    }
}
