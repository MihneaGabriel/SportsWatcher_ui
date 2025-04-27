export interface IRuntimeConfig {
  appVersion: string;
  enviorment: string;
  logEnabled: boolean;
  clientId: string;

  apiUrl: string;
  authIssuerUrl: string;
  signalUrl: string;
}