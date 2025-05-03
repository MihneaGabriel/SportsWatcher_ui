import { NgModule } from "@angular/core";
import { LoginPageComponent } from "./containers/login-page/login-page.component";
import { CommonModule } from "@angular/common";
import { AuthenticationRoutingModule } from "./authentication-routing.module";
import { RouterModule } from "@angular/router";
import { RegisterPageComponent } from "./containers/register-page/register-page.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule ({
  declarations: [
    LoginPageComponent,
    RegisterPageComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    RouterModule,
    ReactiveFormsModule
  ],
})
export class AuthenticationModule { }
// This module is responsible for handling authentication related components and services.