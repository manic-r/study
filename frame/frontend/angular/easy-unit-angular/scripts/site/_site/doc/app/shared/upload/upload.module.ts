import { NgModule } from '@angular/core';
import { NGComponentModules, NzComponentModules } from '../component.module';
import { UploadComponent } from './upload.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [UploadComponent],
  exports: [],
  imports: [
    ...NzComponentModules,
    ...NGComponentModules,
    RouterModule.forChild([
      { path: '', component: UploadComponent }
    ])
  ],
  providers: [],
})
export class UploadModule { }
