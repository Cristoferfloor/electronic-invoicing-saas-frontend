import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-login-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './login-form.component.html',
    styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
    @Input() loading = false;
    @Input() error = '';
    @Output() loginSubmit = new EventEmitter<any>();

    private fb = inject(FormBuilder);
    showPassword = false;

    loginForm: FormGroup = this.fb.group({
        email: ['', [Validators.required]], // RUC o Usuario
        password: ['', [Validators.required]]
    });

    onSubmit() {
        if (this.loginForm.valid) {
            this.loginSubmit.emit(this.loginForm.value);
        }
    }
}
