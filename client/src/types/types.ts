export type TUser = {
  phoneNumber: string;
  firebaseUID: string;
  userID: string;
  token: string;
  firstName: string;
  lastName: string;
  email: string;
  isStudent: boolean;
};

export type TPlanName = "personal" | "student" | "annual";
