import { MoreUploadComponent } from './more-upload.component';
import { NgModule } from '@angular/core';
import { NzComponentModules } from '../component.module';

@NgModule({
  declarations: [MoreUploadComponent],
  exports: [MoreUploadComponent],
  imports: [...NzComponentModules],
  providers: [],
})
export class MoreUploadModule { }
