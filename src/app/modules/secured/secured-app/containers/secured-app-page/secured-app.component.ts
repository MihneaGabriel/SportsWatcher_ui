import { Component } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  templateUrl: './secured-app.component.html',
  styleUrl: './secured-app.component.scss',
  standalone: false
})
export class SecuredAppComponent {
  constructor( private appComponent: AppComponent) {}

  handleRouteActivation(component) {
    this.appComponent?.captureChildData(component);
  }
  
}
