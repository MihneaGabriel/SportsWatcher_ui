import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Route, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
  ) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    // TODO: change when auth is active
    return true;
    if(!this.authService.isLoggedIn) {
      this.goToLogin();
      return false;
    }
    return true;
  }

  private goToLogin(): void {
    console.log('The user is not logged in. Redirecting to login page...');
    window.location.href = '/login';
  }

}
