import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [],
  template: `
    @if (message || content) {
      <div [class]="'alert alert-' + variant">
        <span class="alert-icon">{{ icon }}</span>
        <div class="alert-content">
          <ng-content></ng-content>
          {{ message }}
        </div>
      </div>
    }
  `,
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  @Input() variant: 'success' | 'error' | 'info' = 'info';
  @Input() message?: string;
  @Input() content = true;

  get icon(): string {
    switch (this.variant) {
      case 'success': return '✅';
      case 'error': return '❌';
      default: return 'ℹ️';
    }
  }
}
