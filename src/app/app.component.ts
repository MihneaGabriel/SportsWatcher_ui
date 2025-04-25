import { Component } from '@angular/core';
import { AuthRoutes } from './routes';

@Component({
  selector: 'sportwatcher-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: false
})
export class AppComponent {
  title = 'SportWatcher';
  AuthRoutes = AuthRoutes;
  constructor() {
    console.log('AppComponent initialized');
  }
}
