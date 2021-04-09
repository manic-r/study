import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
// import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { FormsModule } from '@angular/forms';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';

export const NzComponentModules = [
  NzLayoutModule,
  NzUploadModule,
  NzModalModule,
  NzIconModule,
  NzButtonModule,
  // NzCheckboxModule,
  NzSwitchModule,
  NzInputModule
];

export const DComponentModules = [

];

export const NGComponentModules = [
  FormsModule,
  CommonModule
]
