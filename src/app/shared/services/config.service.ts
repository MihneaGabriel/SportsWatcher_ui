import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(private router: Router) {}

  async initClientConfig(): Promise<any> {
    this.addWildCardRoute(this.router)
  }

  private addWildCardRoute(router: Router) {
    if(!router.config.find(c => c.path === '**')) {
      router.config.push({
        path: '**',
        redirectTo: '',
      });
    }
  }
}