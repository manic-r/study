import { NgModule } from "@angular/core";
import { DComponentModules, NzComponentModules } from "./component.module";
import { HeaderModule } from "./header/header.module";
import { MoreUploadModule } from "./more-file-upload/more-upload.module";
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
    MoreUploadModule,
    ...NzComponentModules,
    ...DComponentModules
  ],
  providers: [],
})
export class SharedModule {

}
