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

export type TPlanStatus =
  | "active"
  | "processing"
  | "expired"
  | "cancelled"
  | "overdue";

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

export type TPlanConfig = {
  id: number;
  name: string;
  path: string;
  price: number;
  frequency: TPlanFrequency;
  features: string[];
};

export type TRecord = {
  _id: string;
  cloudflareID: string;
  cloudflareZoneID: string;
  domainID: string;
  planID: string;
  ownerID: string;
  name: string;
  content: string;
  type: TRecordType;
  ttl: number;
  proxied: boolean;
  isActive: boolean;
  created_at: string;
  updated_at: string;
};

export type TDBPlan = {
  _id: string;
  ownerID: string;
  domainID: string;
  planType: TPlanName;
  planLabel: string;
  hasTxtRecord: boolean;
  status: TPlanStatus;
  expiry: string;
  razorpaySubscriptionID: string;
  created_at: string;
};

export type TPlan = TDBPlan & {
  records: TRecord[];
};

export type TPlanStats = {
  personal: number;
  vercel: number;
  annual: number;
  txt: {
    total: number;
    used: number;
  };
};

// Path: client/src/app/api/subscribe/route.ts
export type TSubscribePayload = {
  plan: {
    ownerID: string;
    domainID: string;
    planLabel: string;
    planType: TPlanName;
  };
  record: {
    name: string;
    content: string;
    type: TRecordType;
    domainID: string;
  };
};

export type TRazorpaySubscriptionResponse = {
  subscriptionID: string;
  orderID: string;
  razorpayKey: string;
  planID: string;
  shortUrl: string;
};
