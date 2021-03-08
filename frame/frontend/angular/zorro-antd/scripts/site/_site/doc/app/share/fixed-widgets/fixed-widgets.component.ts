import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-fixed-widgets',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="fixed-widgets">
      <div
        class="ant-avatar ant-avatar-circle ant-avatar-icon fixed-widgets-avatar"
        style="width: 44px; height: 44px; line-height: 44px; font-size: 22px;"
        nz-dropdown
        nzPlacement="topCenter"
        [nzDropdownMenu]="menu"
      >
        <theming-icon></theming-icon>
        <nz-dropdown-menu #menu="nzDropdownMenu">
          <ul nz-menu nzSelectable>
            <li nz-menu-item (click)="onThemeChange('default')">默认主题</li>
            <li nz-menu-item (click)="onThemeChange('dark')">暗黑主题</li>
            <li nz-menu-item (click)="onThemeChange('compact')">紧凑主题</li>
            <li nz-menu-item (click)="onThemeChange('aliyun')">阿里云主题</li>
          </ul>
        </nz-dropdown-menu>
      </div>
    </div>
  `
})
export class FixedWidgetsComponent {
  compact = false;
  @Input() theme: string = 'default';
  @Input() language: string = 'zh';
  @Output() readonly themeChange = new EventEmitter<string>();

  onThemeChange(theme: string): void {
    this.theme = theme;
    this.themeChange.emit(theme);
  }
}
