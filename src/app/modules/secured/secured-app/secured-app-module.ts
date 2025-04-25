import { NgModule, Optional, SkipSelf } from "@angular/core";

@NgModule({
    declarations: [
    //TODO secure app components
  ],
    imports: [
      //TODO CommonModule,
      //TODO SecuredAppRoutingModule,
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
