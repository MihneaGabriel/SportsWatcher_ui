import { Component, Inject, TemplateRef, WritableSignal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RUNTIME_CONFIG } from 'src/libs/utils/runtime-config.utils';

@Component({
  selector: 'sportwatcher-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: false
})
export class AppComponent {
  headerContent!: WritableSignal<TemplateRef<any>>;
  headerContentString!: WritableSignal<string>;
  headerTitle!: WritableSignal<TemplateRef<any>>;
  headerTtileString!: WritableSignal<string>;

  displayLoader$ = new BehaviorSubject<boolean>(true);
  
  title = 'SportWatcher';
  constructor(@Inject(RUNTIME_CONFIG) private runtimeConfig: any) {
    const config = this.runtimeConfig(); // Invoke the function to get the actual config
    this.displayLoader$.next(this.displayLoader$.value);
  }

  captureChildData({ headerContent, headerTitle}: {[key: string] : WritableSignal<TemplateRef<any>|string> }) {
    setTimeout(() => {
      type WST = [ WritableSignal<TemplateRef<any>>, WritableSignal<string> ];
      const [ headerContentValue, headerTitleValue ] = [ headerContent?.(), headerTitle?.() ];
      [ this.headerContent, this.headerContentString ] = [ headerContent, null ][ typeof headerContentValue === 'string' ? 'reverse' : 'slice' ]() as WST;
      [ this.headerTitle, this.headerTtileString ] = [ headerTitle, null ][ typeof headerTitleValue === 'string' ? 'reverse' : 'slice' ]() as WST;
    })
  }
}
