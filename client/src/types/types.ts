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
export type TRecordType = "CNAME" | "A";

export type TNewRecord = {
  name: string;
  content: string;
  plan: TPlanName;
  type: TRecordType;
};
