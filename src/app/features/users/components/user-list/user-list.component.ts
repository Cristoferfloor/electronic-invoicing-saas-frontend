import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../core/services/user.service';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { TableComponent, TableColumnDirective } from '../../../../shared/components/table/table.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { UserFormComponent } from '../user-form/user-form.component';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-user-list',
    standalone: true,
    imports: [
        CardComponent,
        TableComponent,
        TableColumnDirective,
        ButtonComponent,
        ModalComponent,
        UserFormComponent,
        FormsModule,
        AlertComponent  // ← AÑADIDO
    ],
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
    private userService = inject(UserService);
    private cdr = inject(ChangeDetectorRef);  // ← AÑADIDO

    users: any[] = [];
    loading = false;
    error: string | null = null;
    total = 0;
    page = 1;
    limit = 10;
    search = '';

    showModal = false;
    selectedUser: any = null;

    columns = [
        { key: 'firstName', label: 'Nombre' },
        { key: 'lastName', label: 'Apellido' },
        { key: 'email', label: 'Email' },
        { key: 'role', label: 'Rol' },
        { key: 'isActive', label: 'Estado' },
        { key: 'actions', label: 'Acciones' }
    ];

    ngOnInit(): void {
        this.loadUsers();
    }

    loadUsers(): void {
        this.loading = true;
        this.error = null;
        this.userService.getUsers({
            page: this.page,
            limit: this.limit,
            search: this.search
        }).subscribe({
            next: (data) => {
                console.log('✅ Usuarios cargados:', data);  // DEBUG
                this.users = data.users || [];
                this.total = data.total || 0;
                this.loading = false;
                this.cdr.markForCheck();  // ← FUERZA detección de cambios
            },
            error: (err) => {
                console.error('❌ Error cargando usuarios:', err);  // DEBUG
                this.loading = false;
                this.error = err.error?.message || err.message || 'Error al cargar usuarios';
                this.cdr.markForCheck();  // ← FUERZA detección de cambios
            }
        });
    }

    onSearch(): void {
        this.page = 1;
        this.loadUsers();
    }

    openCreateModal(): void {
        this.selectedUser = null;
        this.showModal = true;
    }

    openEditModal(user: any): void {
        this.selectedUser = user;
        this.showModal = true;
    }

    closeModal(): void {
        this.showModal = false;
        this.selectedUser = null;
    }

    onUserSaved(): void {
        this.closeModal();
        this.loadUsers();
    }

    toggleStatus(user: any): void {
        const newStatus = !user.isActive;
        this.userService.updateUser(user.id, { isActive: newStatus }).subscribe({
            next: () => {
                this.loadUsers();
            }
        });
    }
}
