import { NgModule } from "@angular/core";
import { DComponentModules, NzComponentModules } from "./component.module";
import { HeaderModule } from "./header/header.module";

@NgModule({
  declarations: [],
  imports: [
    // ...NzComponentModules,
    // ...DComponentModules
  ],
  exports: [
    HeaderModule,
    ...NzComponentModules,
    ...DComponentModules
  ],
  providers: [],
})
export class SharedModule {

}
