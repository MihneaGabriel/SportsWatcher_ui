import { NgModule } from "@angular/core";
import { LoginPageComponent } from "./containers/login-page/login-page.component";
import { CommonModule } from "@angular/common";
import { AuthenticationRoutingModule } from "./authentication-routing.module";
import { RouterModule } from "@angular/router";

@NgModule ({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    RouterModule,
  ],
})
export class AuthenticationModule { }
// This module is responsible for handling authentication related components and services.