import { AuthGuard } from "src/libs/gurads/auth.guard";
import { SecuredAppComponent } from "./containers/secured-app-page/secured-app.component";
import { SecuredAppRoutes as app } from "src/app/routes";
import { checkForPermissionOrRoles, computedRoutes, on } from "src/libs/routes.utils";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

const routes = () => [
  {
    path: '',
    component: SecuredAppComponent,
    canActivate: [AuthGuard],
    children: [
      on(app.Home.root)
        .when((r) => checkForPermissionOrRoles(r.roles, r.permissions))
        .define((r) => ({ 
          path:  r.path, 
          loadChildren: () => import('./containers/home/home.module').then(m => m.HomeModule),
        })),

      on(app.Sport.root)
        .when((r) => checkForPermissionOrRoles(r.roles, r.permissions))
        .define((r) => ({
          path: r.path,
          loadChildren: () => import('./containers/sports/sports.module').then(m => m.SportsModule),
        })),

      on('**')
      .when(() => true)
      .define(() => ({
        path: '**',
        redirectTo: '/not-found',
      })),
    ],
  },
];

@NgModule({
  providers: computedRoutes(routes),
  exports: [RouterModule]
})
export class SecuredAppRoutingModule {}