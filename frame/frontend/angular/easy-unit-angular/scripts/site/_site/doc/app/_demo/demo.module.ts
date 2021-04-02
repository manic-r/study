import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DemoComponent } from './demo.component';

@NgModule({
  declarations: [
    DemoComponent
  ],
  imports: [
    RouterModule.forChild([
      { path: '', component: DemoComponent }
    ])
  ],
  providers: [],
})
export class DemoModule { }
