import { SideModule } from './side/side.module';
import { NgModule } from "@angular/core";
import { DComponentModules, NzComponentModules, NGComponentModules } from './component.module';
import { HeaderModule } from "./header/header.module";

@NgModule({
  declarations: [],
  imports: [
    // ...NzComponentModules,
    // ...DComponentModules
  ],
  exports: [
    HeaderModule,
    SideModule,
    ...NzComponentModules,
    ...DComponentModules,
    ...NGComponentModules
  ],
  providers: [],
})
export class SharedModule {

}
