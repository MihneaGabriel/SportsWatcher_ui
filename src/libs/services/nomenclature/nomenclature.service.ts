import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";
import { Nomenclature } from "src/libs/models/nomenclator.model";
import { IRuntimeConfig } from "src/libs/models/runtime-config.model";
import { RUNTIME_CONFIG } from "src/libs/utils/runtime-config.utils";

@Injectable({
  providedIn: "root"
})
export class NomenclatureService {
  static BASE_PATH = 'Nomenclature';

  constructor(
    @Inject(RUNTIME_CONFIG) private env: () => IRuntimeConfig,
    private httpClient: HttpClient
  ) {
    NomenclatureService.BASE_PATH = `${this.env().apiUrl}${NomenclatureService.BASE_PATH}`;
  }

  getCountries(): Observable<Nomenclature[]> {
    return this.httpClient.get<Nomenclature[]>(`${NomenclatureService.BASE_PATH}/GetAllCountries`).pipe(
      catchError( () => of([] as Nomenclature[]) )
    )
  }

  getCategories(): Observable<Nomenclature[]> {
    return this.httpClient.get<Nomenclature[]>(`${NomenclatureService.BASE_PATH}/GetAllCategories`).pipe(
      catchError( () => of([] as Nomenclature[]) )
    )
  }
}