import { CommonModule } from "@angular/common";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { Environment } from "./models/environment";

@NgModule({
  imports: [
    CommonModule
  ],
})
export class CoreModule { 
  static forRoot(providers: { environment: Environment }): ModuleWithProviders<any> {
    return {
      ngModule: CoreModule,
      providers: [
        { provide: 'environment', useValue: providers.environment },
      ]
    };
  }
}
