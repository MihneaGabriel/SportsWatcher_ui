import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { catchError, Observable, of, throwError } from "rxjs";
import { LoginForm } from "src/app/modules/public/authentication/containers/models/login.model";
import { IRuntimeConfig } from "src/libs/models/runtime-config.model";

@Injectable({
  providedIn: "root"
})

export class LoginService {
  static BASE_PATH = 'Users';

  constructor(
    @Inject('RUNTIME_CONFIG') private env: () => IRuntimeConfig,
    private httpClient: HttpClient
  ) {
    LoginService.BASE_PATH = `${this.env().apiUrl}${LoginService.BASE_PATH}`;
  }

  login(data: LoginForm): Observable<LoginForm> {
    console.log('Login data:', JSON.stringify(data, null, 2));
    return this.httpClient.post<LoginForm>(`${LoginService.BASE_PATH}/GetUser`, data).pipe(
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

}