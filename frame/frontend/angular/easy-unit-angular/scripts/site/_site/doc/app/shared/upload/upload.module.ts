import { NgModule } from '@angular/core';
import { NzComponentModules } from '../component.module';
import { UploadComponent } from './upload.component';

@NgModule({
  declarations: [UploadComponent],
  exports: [UploadComponent],
  imports: [...NzComponentModules],
  providers: [],
})
export class UploadModule { }
