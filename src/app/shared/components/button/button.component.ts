import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  template: `
    <button 
      [type]="type" 
      [disabled]="disabled || loading" 
      [class]="'btn btn-' + variant"
      (click)="onClick($event)"
    >
      @if (loading) {
        <span class="spinner"></span>
      } @else {
        <ng-content></ng-content>
      }
    </button>
  `,
  /* styleUrls: ['./button.component.scss'] */
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() variant: 'primary' | 'secondary' | 'danger' = 'primary';
  @Input() disabled = false;
  @Input() loading = false;
  @Output() btnClick = new EventEmitter<MouseEvent>();

  onClick(event: MouseEvent) {
    if (!this.disabled && !this.loading) {
      this.btnClick.emit(event);
    }
  }
}
