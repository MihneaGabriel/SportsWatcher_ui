import { Component, Inject } from '@angular/core';
import { RUNTIME_CONFIG } from 'src/libs/utils/runtime-config.utils';

@Component({
  selector: 'sportwatcher-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: false
})
export class AppComponent {
  title = 'SportWatcher';
  constructor(@Inject(RUNTIME_CONFIG) private runtimeConfig: any) {
    const config = this.runtimeConfig(); // Invoke the function to get the actual config
    console.log('RUNTIME_CONFIG:', config); // Log the actual runtime config
    console.log('AppComponent initialized');
  }
}
