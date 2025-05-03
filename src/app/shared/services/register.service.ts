import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";
import { RegisterForm } from "src/app/modules/public/authentication/containers/models/register.model";
import { IRuntimeConfig } from "src/libs/models/runtime-config.model";
import { RUNTIME_CONFIG } from "src/libs/utils/runtime-config.utils";

@Injectable({
  providedIn: "root"
})
export class RegisterService {
  static BASE_PATH = 'Users';

  constructor(
    @Inject(RUNTIME_CONFIG) private env: () => IRuntimeConfig,
    private httpClient: HttpClient
  ){
    RegisterService.BASE_PATH = `${this.env().apiUrl}${RegisterService.BASE_PATH}`;
  }

  createAccount(data: RegisterForm): Observable<RegisterForm> {
    return this.httpClient.post<RegisterForm>(`${RegisterService.BASE_PATH}/CreateUser`, data).pipe(
      catchError(() => of({} as RegisterForm))
    );
  }
}