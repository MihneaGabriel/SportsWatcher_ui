import { Component } from '@angular/core';


@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  standalone: false
})
export class LoginPageComponent {
  constructor() {
    console.log('LoginPageComponent initialized');
  }

}
