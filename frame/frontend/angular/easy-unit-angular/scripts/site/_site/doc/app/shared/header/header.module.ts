import { NgModule } from "@angular/core";
import { NzComponentModules } from "../component.module";
import { HeaderComponent } from './header.component';

@NgModule({
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  imports: [...NzComponentModules],
  providers: [],
})
export class HeaderModule { }
