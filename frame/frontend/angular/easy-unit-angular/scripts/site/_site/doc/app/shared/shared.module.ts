import { NgModule } from "@angular/core";
import { DComponentModules, NzComponentModules } from "./component.module";
import { HeaderModule } from "./header/header.module";
import { UploadModule } from "./upload/upload.module";

@NgModule({
  declarations: [],
  imports: [
    // ...NzComponentModules,
    // ...DComponentModules
  ],
  exports: [
    HeaderModule,
    UploadModule,
    ...NzComponentModules,
    ...DComponentModules
  ],
  providers: [],
})
export class SharedModule {

}
