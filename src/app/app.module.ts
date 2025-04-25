import { CUSTOM_ELEMENTS_SCHEMA, Inject, NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { AuthService } from "../libs/services/auth/auth.service"; // Import AuthService
import { MenuComponent } from "./shared/containers/menu/menu.component";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    BrowserModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
  providers: [
    AuthService,
    // TODO { provide: 'RUNTIME_CONFIG', useFactory: () => inject(RUNTIME_CONFIG) },
  ]
  })
export class AppModule { }