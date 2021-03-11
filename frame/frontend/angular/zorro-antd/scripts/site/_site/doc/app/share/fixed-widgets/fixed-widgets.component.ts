import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-fixed-widgets',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './fixed-widgets.component.html',
  styleUrls: ['./fixed-widgets.component.less']
})
export class FixedWidgetsComponent {
  compact = false;
  @Input() theme: string = 'default';
  @Output() readonly themeChange = new EventEmitter<string>();

  @Input() colorHex: string = '#1890ff';
  // tslint:disable-next-line:no-any
  @Output() colorChange = new EventEmitter<any>();

  // tslint:disable-next-line:no-any
  changeColor(res: any): void {
    this.colorChange.emit(res);
  }

  onThemeChange(theme: string): void {
    this.theme = theme;
    this.themeChange.emit(theme);
  }
}
