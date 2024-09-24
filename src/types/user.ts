export interface LogedUserType {
  _id: string;
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

export interface EditUserProfileType {
  firstName: string;
  lastName: string;
  birthday: string;
}
