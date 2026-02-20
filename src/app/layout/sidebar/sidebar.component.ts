import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  private authService = inject(AuthService);

  currentUser$ = this.authService.currentUser$ as Observable<User | null>;

  currentUserName$ = this.authService.currentUser$.pipe(
    map(user => {
      if (user) {
        const fullName = `${user.firstName} ${user.lastName}`.trim();
        return fullName || user.email?.split('@')[0] || 'Usuario';
      }
      return 'Usuario';
    })
  );

  logout(): void {
    this.authService.logout();
  }
}
