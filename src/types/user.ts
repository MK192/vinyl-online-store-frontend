import { AddressType } from "./general";

export interface LogedUserType {
  _id: string;
  addresses: AddressType[];
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
