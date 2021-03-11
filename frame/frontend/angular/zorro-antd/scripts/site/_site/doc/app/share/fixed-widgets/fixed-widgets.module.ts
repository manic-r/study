import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { FixedWidgetsComponent } from './fixed-widgets.component';
import { ThemingIcon } from './theme-icons'
import { ColorSketchModule } from 'ngx-color/sketch';
import { NzPopoverModule } from 'ng-zorro-antd/popover';

@NgModule({
  declarations: [
    FixedWidgetsComponent,
    ThemingIcon
  ],
  imports: [
    CommonModule,
    NzAvatarModule,
    NzDropDownModule,
    NzPopoverModule,
    ColorSketchModule
  ],
  exports: [FixedWidgetsComponent]
})
export class FixedWidgetsModule { }
