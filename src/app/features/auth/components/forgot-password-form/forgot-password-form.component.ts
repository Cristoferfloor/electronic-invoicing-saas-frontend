import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-forgot-password-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './forgot-password-form.component.html',
    styleUrl: './forgot-password-form.component.scss'
})
export class ForgotPasswordFormComponent {
    @Input() loading = false;
    @Input() error = '';
    @Input() successMessage = '';
    @Output() forgotSubmit = new EventEmitter<string>();

    private fb = inject(FormBuilder);

    forgotForm: FormGroup = this.fb.group({
        email: ['', [Validators.required, Validators.email]]
    });

    onSubmit() {
        if (this.forgotForm.valid) {
            this.forgotSubmit.emit(this.forgotForm.get('email')?.value);
        }
    }
}
