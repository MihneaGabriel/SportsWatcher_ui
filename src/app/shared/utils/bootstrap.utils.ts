import { APP_INITIALIZER } from "@angular/core";
import { RuntimeConfigService } from "src/libs/services/runtime-config/runtime-config.service";

function bootstrap(
  runtimeConfigService: RuntimeConfigService,
  // clientConfig: ConfigService,
) {
  return () => Promise.all([
    (async () => {
      await runtimeConfigService.loadConfig();

      return Promise.resolve();
    })(),
  ]);
}

export const AppBootstrapProvider = {
  provide: APP_INITIALIZER,
  useFactory: bootstrap,
  deps: [RuntimeConfigService ], // TODO config service?
  multi: true
}