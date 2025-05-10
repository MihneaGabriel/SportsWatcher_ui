import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable, of, Subject, throwError } from "rxjs";
import { LoginForm } from "src/app/modules/public/authentication/containers/models/login.model";
import { RegisterForm } from "src/app/modules/public/authentication/containers/models/register.model";
import { IRuntimeConfig } from "src/libs/models/runtime-config.model";
import { RUNTIME_CONFIG } from "src/libs/utils/runtime-config.utils";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  static BASE_PATH = 'Users';
  private reloadRoutesSubject = new Subject<void>();
  reloadRoutes$ = this.reloadRoutesSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private username = new BehaviorSubject<string>(null);
  username$ = this.username.asObservable();
  
  constructor(
    @Inject(RUNTIME_CONFIG) private env: () => IRuntimeConfig,
    private httpClient: HttpClient
  ) {
    AuthenticationService.BASE_PATH = `${this.env().apiUrl}${AuthenticationService.BASE_PATH}`;
  }

  login(data: LoginForm): Observable<any> {
    console.log('Login data:', JSON.stringify(data, null, 2));
    return this.httpClient.post<any>(`${AuthenticationService.BASE_PATH}/GetUser`, data).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Something went wrong.';
        
        if (error.status === 404) {
          errorMessage = 'Email or password is incorrect.';
        } else if (error.status === 0) {
          errorMessage = 'Server is unreachable.';
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  setLogin(name: string ){
    localStorage.setItem('username', name );
    this.username.next(name);
  }

  register(data: RegisterForm): Observable<RegisterForm> {
    return this.httpClient.post<RegisterForm>(`${AuthenticationService.BASE_PATH}/CreateUser`, data).pipe(
      catchError(() => of({} as RegisterForm))
    );
  }

  resetPassword(email : string): Observable<string> {
    return this.httpClient.put<{ tempPassword: string }>(`${AuthenticationService.BASE_PATH}/ResetUserPassword`,{ email }).pipe(      
      map(response => response.tempPassword), 
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Failed to reset password.';
        
        if (error.status === 404) {
          errorMessage = 'Email not found.';
        } else if (error.status === 0) {
          errorMessage = 'Server is unreachable.';
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }

}
