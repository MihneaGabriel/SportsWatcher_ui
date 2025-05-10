import {
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  LOCALE_ID,
  NgModule,
} from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../libs/services/auth/auth.service';
import { CommonModule, DatePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { RUNTIME_CONFIG } from 'src/libs/utils/runtime-config.utils';
import { CoreModule } from 'src/libs/core.module';
import { environment } from 'src/app/environments/environment';
import { AppRoutingModule } from './app.routes';
import { AppBootstrapProvider } from './shared/utils/bootstrap.utils';
import { FormGroupDirective } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    BrowserModule,
    RouterModule.forRoot([]),
    AppRoutingModule,
    CoreModule.forRoot({ environment }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
  providers: [
    AuthService,
    { provide: 'RUNTIME_CONFIG', useFactory: () => inject(RUNTIME_CONFIG) },
    AppBootstrapProvider,
    {
      provide: LOCALE_ID,
      useValue: 'en-US',
    },
    FormGroupDirective,
    DatePipe,
  ],
})
export class AppModule {}
