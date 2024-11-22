export interface RegistrationFormType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  terms: boolean;
}

export interface LoginFormType {
  email: string;
  password: string;
}

export interface EditUserProfileFormType {
  firstName: string;
  lastName: string;
  birthday: string;
}

export interface ChangePasswordFormType {
  currentPassword: string;
  newPassword: string;
}

export interface EditAddressFormType {
  apartment: string;
  city: string;
  company: string;
  country: string;
  firstName: string;
  isDefault: boolean;
  lastName: string;
  postalCode: string;
  phone: string;
  streetAddress: string;
  state: string | null;
}
