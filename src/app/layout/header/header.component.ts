import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
    private authService = inject(AuthService);
    user$ = this.authService.currentUser$;

    greeting = this.getGreeting();

    getGreeting(): string {
        const hour = new Date().getHours();
        
        if (hour >= 5 && hour < 12) {
            return 'Buenos días';
        } else if (hour >= 12 && hour < 18) {
            return 'Buenas tardes';
        } else {
            return 'Buenas noches';
        }
    }

    getCurrentTime(): string {
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return now.toLocaleDateString('es-EC', options);
    }

    logout() {
        this.authService.logout();
    }
}

