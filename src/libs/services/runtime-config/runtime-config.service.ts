import { HttpBackend, HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { lastValueFrom, ReplaySubject, tap } from "rxjs";
import { IRuntimeConfig } from "src/libs/models/runtime-config.model";

@Injectable({
  providedIn: "root",
})
export class RuntimeConfigService {
  private _config!: IRuntimeConfig;
  get config(): IRuntimeConfig {
    return this._config;
  }

  private configLoadedSubkject = new ReplaySubject<boolean>(1);
  configLoaded$ = this.configLoadedSubkject.asObservable();

  private httpClient: HttpClient; 

  constructor(
    private httpHandelr: HttpBackend,
    @Inject('environment') private environment: { runtimeConfigUrl: string }
  ) {
    this.httpClient = new HttpClient(this.httpHandelr);
  }

  async loadConfig(): Promise<IRuntimeConfig | void> {
    try {
      const url = this.environment.runtimeConfigUrl;
      return await lastValueFrom(
        this.httpClient.get<IRuntimeConfig>(url).pipe(
          tap((config: IRuntimeConfig) => {
            this._config = config;
            this.configLoadedSubkject.next(true);
          })
        )
      );
    } catch (error) {
      console.error("Error loading runtime config:", error);
      this.configLoadedSubkject.next(false);
    }
  }
}