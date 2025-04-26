import { Component } from '@angular/core';

@Component({
  selector: 'sportwatcher-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: false
})
export class AppComponent {
  title = 'SportWatcher';
  constructor() {
    console.log('AppComponent initialized');
  }
}
