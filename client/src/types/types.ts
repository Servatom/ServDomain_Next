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
};

export type TPlanName = "personal" | "vercel" | "annual";
export type TRecordType = "CNAME" | "A" | "TXT";

export type TNewRecord = {
    name: string;
    content: string;
    plan: TPlanName;
    type: TRecordType;
};
