import { defineInjectable, EnvironmentInjector, inject, runInInjectionContext } from "@angular/core";
import { Route, Router, ROUTES } from "@angular/router"; 
import { AuthService } from "./services/auth/auth.service";
import { AppRoute, IRouteChain, RouteDefinePredicate, RouteWhenPredicate } from "./route.model";

export const noMatchRoute = { path: 'no-match', children: []}

export function on(route: string | AppRoute): IRouteChain {
  const chainObj = {
    route,
    finalRoute: null,
    canDefineRoute: true,
    when: null,
    define: null,
    otherwise: null,
  } as IRouteChain 

  chainObj.when = when.bind(chainObj);
  chainObj.define = define.bind(chainObj);
  chainObj.otherwise = otherwise.bind(chainObj);
  return chainObj;
}

// Conditional which, based on a predicate, allows a
// route to be defined or not. Meant to be placed in a
// chained call, between 'on()' and 'define()'.
export function when(this: IRouteChain, pred: RouteWhenPredicate): IRouteChain {
  const chainObj = this;
  const result = pred?.(chainObj.route);
  chainObj.canDefineRoute = result;
  return chainObj;
}

// Usually, the last step of a route defining chain,
// which, based on the value of 'canDefineRoute' property
// of the chain data, will either add a new Ng Route
// rule to the system, or add a dummy 'no-match' one.
//
// Optionally, it can be continued with 'otherwise()'.
export function define(this: IRouteChain, arg: Route | RouteDefinePredicate): Route | any {
  const chainObj = this;
  let result: any = noMatchRoute;
  if (chainObj.canDefineRoute) {
    if (typeof arg === 'object') {          // Route
      result = arg;
    } else if (typeof arg === 'function') { // RouteDefinePredicate
      result = arg(chainObj.route);
    }
  }

  chainObj.finalRoute = result;
  return Object.assign(result, { otherwise: chainObj.otherwise });
}

// Optional last step of the define route step, which either
// adds a successful Ng Route coming from 'define()', or uses
// the one provided as an argument to the function.
export function otherwise(this: IRouteChain, arg: Route | RouteDefinePredicate): Route {
  const chainObj = this;
  if (chainObj.canDefineRoute && chainObj.finalRoute) {
    delete (chainObj.finalRoute as any).otherwise;
    return chainObj.finalRoute;
  } else if (typeof arg === 'object') {   // Route
    return arg;
  } else if (typeof arg === 'function') { // RouteDefinePredicate
    return arg(chainObj.route);
  }
  return noMatchRoute;
}

export function computedRoutes(routes: any): any[] {
  return [
    {
      provide: ROUTES,
      useFactory: routes,
      multi: true
    }
  ]
}

export function subscribeToReloadRoutesEvent(injector: EnvironmentInjector): void {
  runInInjectionContext(injector, () => {
    inject(AuthService).reloadRoutes$.subscribe(() => {
      runInInjectionContext(injector, () => {
        const routesToReload: any[] = inject(Router).config.filter(route => route.data?.['reactToReloadRoutes']);
        for (const route of routesToReload) {
          route._loadedRoutes = undefined; // Clear the loaded routes to force reloading
        }
      });
    });
  });
}


export function checkForPermissionOrRoles(roles: string[], permissions: string[]): boolean {
  if(!roles?.length && !permissions?.length) {
    return true;
  }

  // permission check first ??
  // roles check first ??
  return false;
}