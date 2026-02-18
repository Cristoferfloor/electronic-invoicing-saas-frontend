import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-register-tenant-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './register-tenant-form.component.html',
    styleUrl: './register-tenant-form.component.scss'
})
export class RegisterTenantFormComponent {
    @Input() loading = false;
    @Input() error = '';
    @Output() registerSubmit = new EventEmitter<any>();

    private fb = inject(FormBuilder);
    logoBase64: string = '';

    registerForm: FormGroup = this.fb.group({
        commercialName: ['', Validators.required],
        legalName: ['', Validators.required],
        taxId: ['', [Validators.required, Validators.pattern('^[0-9]{13}$')]],
        address: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: [''],
        logoUrl: [''], // For Base64 logo
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        adminEmail: ['', [Validators.required, Validators.email]],
        password: ['', [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9]).*$/) // Al menos una mayúscula y un número
        ]]
    });

    onFileSelected(event: any) {
        const file: File = event.target.files[0];
        if (file) {
            // Validate size (max 500kb)
            if (file.size > 500000) {
                alert('Logo file size is too large. Maximum size is 500KB.');
                return;
            }

            const reader = new FileReader();
            reader.onload = () => {
                this.logoBase64 = reader.result as string;
                this.registerForm.patchValue({ logoUrl: this.logoBase64 });
            };
            reader.readAsDataURL(file);
        }
    }

    onSubmit() {
        if (this.registerForm.valid) {
            this.registerSubmit.emit(this.registerForm.value);
        }
    }
}
