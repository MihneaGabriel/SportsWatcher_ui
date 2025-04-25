import { Route } from "@angular/router";

export class AppRoute {
    path?: string;
    url?: string;
    urlWithId?: string;
    name?: string;
    roles?: string[];
    permissions?: string[];
    children?: AppRoute[];
}

export type RouteWhenPredicate = (route: AppRoute) => boolean;
export type RouteDefinePredicate = (route: AppRoute) => Route;

export interface IRouteChain {
    route: AppRoute;
    finalRoute: Route;
    canDefineRoute: boolean;
    when(pred: RouteWhenPredicate): IRouteChain;
    define(arg: Route | RouteDefinePredicate): Route & { otherwise: (arg: Route | RouteDefinePredicate) => Route };
    otherwise(arg: Route | RouteDefinePredicate): Route;
}