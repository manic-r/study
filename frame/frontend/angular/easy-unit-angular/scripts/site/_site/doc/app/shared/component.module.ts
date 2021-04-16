import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule } from '@angular/forms';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAffixModule } from 'ng-zorro-antd/affix';

import { AccordionModule } from 'ng-devui/accordion';

export const NzComponentModules = [
  NzLayoutModule,
  NzUploadModule,
  NzModalModule,
  NzIconModule,
  NzButtonModule,
  NzSwitchModule,
  NzInputModule,
  NzGridModule,
  NzCardModule,
  NzAffixModule
];

export const DComponentModules = [
  AccordionModule
];

export const NGComponentModules = [
  FormsModule,
  CommonModule
]
