import { Component } from '@angular/core';
import { AuthRoutes } from 'src/app/routes';


@Component({
  selector: 'sportwatcher-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  standalone: false
})
export class LoginPageComponent {
  authRoutes = AuthRoutes;

}
