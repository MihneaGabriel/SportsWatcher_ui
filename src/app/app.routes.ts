import { RouterModule, Routes } from "@angular/router";
import { LandingModule } from "./modules/public/landing/landing.module";
import { PublicAppRoutes, SecuredAppRoutes } from "./routes";
import { EnvironmentInjector, NgModule } from "@angular/core";
import { subscribeToReloadRoutesEvent } from "src/libs/routes.utils";

const appRoutes: Routes = [
  {
    path: PublicAppRoutes.root.path,
    loadChildren: () => LandingModule,
  },
  {
    path: PublicAppRoutes.Auth.root.path,
    loadChildren: () => import('./modules/public/authentication/atuhentication.module').then(m => m.AuthenticationModule),
  },
  {
    path: SecuredAppRoutes.root.path,
    loadChildren: () => import('./modules/secured/secured-app/secured-app-module').then(m => m.SecuredAppModule),
    data: { reactToReloadRoutes: true }
  },
  { path: '**', redirectTo: SecuredAppRoutes.root.path, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { bindToComponentInputs: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  constructor(private injector: EnvironmentInjector) {
    // This is where you can inject services or perform any necessary setup for the routing module.
    subscribeToReloadRoutesEvent(injector);
  }
}
// This module is responsible for defining the application's routing configuration.
