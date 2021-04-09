import { NgModule } from '@angular/core';
import { NGComponentModules, NzComponentModules } from '../component.module';
import { UploadComponent } from './upload.component';

@NgModule({
  declarations: [UploadComponent],
  exports: [UploadComponent],
  imports: [...NzComponentModules, ...NGComponentModules],
  providers: [],
})
export class UploadModule { }
