export interface Environment {
  production: boolean;
  runtimeConfigUrl: string;
  useMock?: Record<string, boolean>;
  showLeavePageConfirmation?: boolean;
}