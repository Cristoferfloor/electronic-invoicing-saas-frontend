import { Component, Input, ContentChildren, QueryList, TemplateRef, Directive } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Directive({
  selector: '[columnTemplate]',
  standalone: true
})
export class TableColumnDirective {
  @Input() columnTemplate!: string;
  constructor(public template: TemplateRef<any>) { }
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [ NgTemplateOutlet],
  template: `
    <div class="table-container">
      @if (loading) {
        <div class="loading-overlay">
          <div class="spinner"></div>
        </div>
      }

      <table class="data-table">
        <thead>
          <tr>
            @for (col of columns; track col.key) {
              <th>{{ col.label }}</th>
            }
          </tr>
        </thead>
        <tbody>
          @for (row of data; track row; let i = $index) {
            <tr>
              @for (col of columns; track col.key) {
                <td>
                  @if (getTemplate(col.key); as template) {
                    <ng-container *ngTemplateOutlet="template; context: { row: row, index: i }"></ng-container>
                  } @else {
                    {{ row[col.key] }}
                  }
                </td>
              }
            </tr>
          }
          @if (data.length === 0 && !loading) {
            <tr>
              <td [attr.colspan]="columns.length" class="empty-state">
                No se encontraron resultados
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styleUrl: './table.component.scss'
})
export class TableComponent {
  @Input() columns: { key: string, label: string }[] = [];
  @Input() data: any[] = [];
  @Input() loading = false;

  @ContentChildren(TableColumnDirective) columnTemplates?: QueryList<TableColumnDirective>;

  getTemplate(key: string): TemplateRef<any> | null {
    if (!this.columnTemplates) return null;
    const col = this.columnTemplates.find(c => c.columnTemplate === key);
    return col ? col.template : null;
  }
}
