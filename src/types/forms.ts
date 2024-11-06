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

export interface EditUserProfileType {
  firstName: string;
  lastName: string;
  birthday: string;
}

export interface ChangePasswordType {
  currentPassword: string;
  newPassword: string;
}

export interface EditAddressType {
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
  state: string;
}
