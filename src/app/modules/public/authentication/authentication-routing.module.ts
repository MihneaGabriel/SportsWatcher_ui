import { AuthRoutes as authRoutes } from "src/app/routes";
import { LoginPageComponent } from "./containers/login-page/login-page.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RegisterPageComponent } from "./containers/register-page/register-page.component";

const routes: Routes = [
  {
    path: authRoutes.login.path,
    component: LoginPageComponent,
    title: authRoutes.login.name,
  },
  {
    path: authRoutes.register.path,
    component: RegisterPageComponent,
    title: authRoutes.register.name,
  },
  // TODO Add forgot password routes

  { path: "**", redirectTo: authRoutes.login.path, pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule {}
// This module is responsible for handling authentication related routes. 
// It imports the LoginPageComponent and sets up the routing for the login page. 
// The Title service is also provided to set the title of the page to "Login". 
// The module uses RouterModule to define the routes and exports it for use in other parts of the application.