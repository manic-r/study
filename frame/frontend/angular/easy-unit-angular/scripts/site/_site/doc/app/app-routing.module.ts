import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'demo', loadChildren: () => import('./_demo/demo.module').then(m => m.DemoModule) },
  { path: 'upload', loadChildren: () => import('./shared/upload/upload.module').then(m => m.UploadModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
