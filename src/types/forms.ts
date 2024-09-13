export interface RegistrationType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  terms: boolean;
}

export interface LoginType {
  email: string;
  password: string;
}
