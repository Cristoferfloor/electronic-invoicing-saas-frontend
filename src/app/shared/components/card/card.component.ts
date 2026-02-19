import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  template: `
    <div class="card">
      @if (title) {
        <div class="card-header">
          <h3>{{ title }}</h3>
        </div>
      }
      <div class="card-body">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() title?: string;
}
