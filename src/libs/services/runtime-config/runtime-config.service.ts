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
    if (!this._config) {
      throw new Error('Runtime configuration is not loaded yet.');
    }
    return this._config;
  }

  private configLoadedSubject = new ReplaySubject<boolean>(1);
  configLoaded$ = this.configLoadedSubject.asObservable();

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
            this.configLoadedSubject.next(true);
          })
        )
      );
    } catch (error) {
      console.error("Error loading runtime config:", error);
    }
  }
}