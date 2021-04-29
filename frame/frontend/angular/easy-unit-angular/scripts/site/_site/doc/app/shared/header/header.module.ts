import { NgModule } from "@angular/core";
import { NzComponentModules } from "../component.module";
import { HeaderComponent } from './header.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  imports: [
    ...NzComponentModules,
    TranslateModule
  ],
  providers: [],
})
export class HeaderModule { }
