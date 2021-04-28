import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UploadModule } from '../shared/upload/upload.module';
import { DemoComponent } from './demo.component';

@NgModule({
  declarations: [
    DemoComponent
  ],
  imports: [
    UploadModule,
    RouterModule.forChild([
      { path: '', component: DemoComponent }
    ])
  ],
  providers: [],
})
export class DemoModule { }
