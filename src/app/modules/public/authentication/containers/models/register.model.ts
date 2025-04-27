export interface RegisterForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  region: string;
  promotions: boolean;
  termsAgreement: boolean;
  ageConfirmation: boolean;
}