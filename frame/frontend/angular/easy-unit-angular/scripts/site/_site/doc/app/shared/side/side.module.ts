import { DComponentModules, NGComponentModules } from './../component.module';
import { SideComponent } from './side.component';
import { NgModule } from "@angular/core";
import { NzComponentModules } from "../component.module";

@NgModule({
  declarations: [SideComponent],
  exports: [SideComponent],
  imports: [...NzComponentModules, ...DComponentModules, ...NGComponentModules],
  providers: [],
})
export class SideModule { }
