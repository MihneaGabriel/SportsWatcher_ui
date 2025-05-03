import { Component } from '@angular/core';
import { AuthRoutes } from 'src/app/routes';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  standalone: false
})
export class MenuComponent {
  authRoutes = AuthRoutes;

}
