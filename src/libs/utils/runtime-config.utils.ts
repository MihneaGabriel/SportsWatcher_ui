import { InjectionToken, inject } from "@angular/core";
import { IRuntimeConfig } from "../models/runtime-config.model";
import { RuntimeConfigService } from "../services/runtime-config/runtime-config.service";

export const RUNTIME_CONFIG = new InjectionToken<() => IRuntimeConfig>('RUNTIME_CONFIG', {
  providedIn: 'root',
  factory: () => {
    const runtimeConfigService = inject(RuntimeConfigService);
    return () => runtimeConfigService.config;
  },
});