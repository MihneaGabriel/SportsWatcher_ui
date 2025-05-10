export interface RegisterForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
  promotions: boolean;
  termsAgreement: boolean;
  ageConfirmation: boolean;
}