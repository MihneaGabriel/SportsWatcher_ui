import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LandingPageComponent } from "./containers/landing-page/landing-page.component";
import { LandingRoutingModule } from "./landing-routing.module";
import { MenuComponent } from "src/app/shared/containers/menu/menu.component";

@NgModule({
  declarations: [
    LandingPageComponent,
    MenuComponent,
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
  ],

    
})
export class LandingModule { }
// This module is responsible for handling the landing page and its components.