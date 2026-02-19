import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../../core/services/user.service';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
    selector: 'app-user-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ButtonComponent
    ],
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
    private fb = inject(FormBuilder);
    private userService = inject(UserService);

    @Input() user: any = null;
    @Output() saved = new EventEmitter<void>();
    @Output() cancel = new EventEmitter<void>();

    userForm: FormGroup;
    loading = false;
    error: string | null = null;

    constructor() {
        this.userForm = this.fb.group({
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', []], // Password validation set dynamically in ngOnInit
            role: ['USER', [Validators.required]],
            isActive: [true]
        });
    }

    ngOnInit(): void {
        if (this.user) {
            this.userForm.patchValue({
                firstName: this.user.firstName,
                lastName: this.user.lastName,
                email: this.user.email,
                role: this.user.role,
                isActive: this.user.isActive
            });
            this.userForm.get('email')?.disable();
            this.userForm.get('password')?.setValidators([]);
        } else {
            this.userForm.get('password')?.setValidators([Validators.required, Validators.minLength(8)]);
        }
        this.userForm.get('password')?.updateValueAndValidity();
    }

    onSubmit(): void {
        if (this.userForm.invalid) return;
        this.loading = true;
        this.error = null;
        const userData = this.userForm.getRawValue();

        if (this.user) {
            this.userService.updateUser(this.user.id, userData).subscribe({
                next: () => {
                    this.loading = false;
                    this.saved.emit();
                },
                error: (err) => {
                    this.loading = false;
                    this.error = err.error?.message || 'Error al actualizar usuario';
                }
            });
        } else {
            this.userService.createUser(userData).subscribe({
                next: () => {
                    this.loading = false;
                    this.saved.emit();
                },
                error: (err) => {
                    this.loading = false;
                    this.error = err.error?.message || 'Error al crear usuario';
                }
            });
        }
    }
}
