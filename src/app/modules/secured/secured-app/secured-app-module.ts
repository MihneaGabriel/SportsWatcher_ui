import { CommonModule } from "@angular/common";
import { NgModule, Optional, SkipSelf } from "@angular/core";
import { SecuredAppComponent } from "./containers/secured-app-page/secured-app.component";
import { SecuredAppRoutingModule } from "./secured-app-routing-module";

@NgModule({
  declarations: [
    SecuredAppComponent,
  ],
  imports: [
    CommonModule,
    SecuredAppRoutingModule,
  ],
})
export class SecuredAppModule {
  constructor(@Optional() @SkipSelf() parentModule: SecuredAppModule) {
    if (parentModule) {
      throw new Error(
        "SecuredAppModule is already loaded!"
      );
    }
  }
}
