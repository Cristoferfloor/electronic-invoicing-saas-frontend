import { Component, OnInit, inject } from '@angular/core';
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
        FormsModule
    ],
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
    private userService = inject(UserService);

    users: any[] = [];
    loading = false;
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
        this.userService.getUsers({
            page: this.page,
            limit: this.limit,
            search: this.search
        }).subscribe({
            next: (data) => {
                this.users = data.users;
                this.total = data.total;
                this.loading = false;
            },
            error: () => {
                this.loading = false;
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
