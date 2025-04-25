import { EnvironmentInjector, inject, runInInjectionContext } from "@angular/core";
import { Router } from "@angular/router"; // <-- typo was "@angluar"
import { AuthService } from '../libs/services/auth/auth.service'; // Make sure this path is correct

export function subscribeToReloadRoutesEvent(injector: EnvironmentInjector): void {
  runInInjectionContext(injector, () => {
    inject(AuthService).reloadRoutes$.subscribe(() => {
      runInInjectionContext(injector, () => {
        const router = inject(Router);
        const routesToReload: any[] = router.config.filter(route => route.data?.['reactToReloadRoutes']);
        for (const route of routesToReload) {
          route._loadedRoutes = undefined; // Clear the loaded routes to force reloading
        }
      });
    });
  });
}
