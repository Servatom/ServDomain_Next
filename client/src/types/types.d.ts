export type TUser = {
  phoneNumber: string;
  firebaseUID: string;
  userID: string;
  token: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  isStudent?: boolean;
  stripeCustomerId?: string;
  onWaitlist: boolean;
};

export type TPlanName = "personal" | "vercel" | "annual";
export type TPlanFrequency = "Daily" | "Monthly" | "Yearly";
export type TRecordType = "CNAME" | "A" | "TXT";

export type TNewRecord = {
  name: string;
  content: string;
  plan: TPlanName;
  type: TRecordType;
};

export type TStatus = {
  variant: "success" | "error" | "neutral";
  text: string;
};

export type TPlan = {
  id: number;
  name: string;
  path: string;
  price: number;
  frequency: TPlanFrequency;
  features: string[];
};

export type TRecord = {
  _id: string;
  type: TRecordType;
  name: string;
  content: string;
  expiry: string;
  plan: TPlanName;
  status: "active" | "processing" | "expired" | "cancelled" | "overdue";
  stripeSubscriptionId: string;
  cloudflareId: string;
  cloudflareZoneId: string;
};
