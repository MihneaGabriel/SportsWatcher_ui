import { CUSTOM_ELEMENTS_SCHEMA, inject, NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { AuthService } from "../libs/services/auth/auth.service"; // Import AuthService
import { MenuComponent } from "./shared/containers/menu/menu.component";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app.routes";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    BrowserModule,
    RouterModule.forRoot([]), 
    AppRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
  providers: [
    AuthService,
    // { provide: 'RUNTIME_CONFIG', useFactory: () => inject(RUNTIME_CONFIG) },
  ]
  })
export class AppModule { }