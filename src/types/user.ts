export interface UserAddressType {
  _id: string;
  apartment: string;
  city: string;
  company: string;
  country: string;
  firstName: string;
  lastName: string;
  isDefault: boolean;
  phone: string;
  postalCode: string;
  state: string;
  streetAddress: string;
}

export interface LogedUserType {
  _id: string;
  addresses: UserAddressType[];
  birthday: string;
  createdAt: string;
  email: string;
  firstName: string;
  lastName: string;
  loyalityPoints: number;
  profileImage: string;
  recordsCollection: [];
  updatedAt: string;
}
