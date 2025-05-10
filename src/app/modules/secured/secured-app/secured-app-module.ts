import { CommonModule } from "@angular/common";
import { NgModule, Optional, SkipSelf } from "@angular/core";
import { SecuredAppComponent } from "./containers/secured-app-page/secured-app.component";
import { SecuredAppRoutingModule } from "./secured-app-routing-module";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { DrawerComponent } from "./containers";

@NgModule({
  declarations: [
    SecuredAppComponent,
    NavbarComponent,
    SidebarComponent,
    DrawerComponent,
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
