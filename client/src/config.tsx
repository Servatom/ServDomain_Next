import { IPricingCardProps, TPlan, TPlanFrequency } from "./components/types";
import { TPlanName } from "./types/types";

export const features: {
  [key in TPlanName]: string[];
} = {
  personal: ["CNAME Record", "A Record", "Billed Monthly"],
  student: ["CNAME Record", "A Record", "Billed Monthly"],
  annual: ["CNAME Record", "A Record", "Hassle-free for an year"],
};

export const plans: TPlan[] = [
  {
    id: 1,
    name: "Personal",
    price: 1,
    frequency: "Daily",
    features: features["personal"],
  },
  {
    id: 2,
    name: "Student",
    price: 0.5,
    frequency: "Daily",
    features: features["student"],
  },
  {
    id: 3,
    name: "Annual",
    price: 100,
    frequency: "Yearly",
    features: features["annual"],
  },
];

export const products: {
  [key: string]: {
    productId: string;
    interval: "month" | "year" | "week" | "day";
    unit_amount: number;
  };
} = {
  annual: {
    productId: "prod_OMM6tsZxTAFR3O",
    interval: "year",
    unit_amount: 10000,
  },
  personal: {
    productId: "prod_OMM2P5yDisxbhd",
    interval: "month",
    unit_amount: 3000,
  },
  student: {
    productId: "prod_OMLgz8ig0G6jLY",
    interval: "month",
    unit_amount: 1500,
  },
};

export const paymentPagePlans: {
  [key in TPlanName]: {
    price: number;
    frequency: TPlanFrequency;
    description: string;
  };
} = {
  personal: {
    price: 30,
    frequency: "Monthly",
    description:
      "Personal Plan lets you own a CNAME/A Record at ₹1 per day, billed monthly. You can freely edit the content of a record after purchase.",
  },
  student: {
    price: 15,
    frequency: "Monthly",
    description:
      "Student Plan lets you own a CNAME/A Record at ₹0.5 per day, billed monthly. You can freely edit the content of a record after purchase.",
  },
  annual: {
    price: 100,
    frequency: "Yearly",
    description:
      "Annual Plan lets you own a CNAME/A Record at ₹100 per annum, saving a MASSIVE 72%. You can freely edit the content of a record after purchase. Pay once a year and stay hassle-free!",
  },
};

export const statusVariantClasses = {
  success: "text-green-400",
  error: "text-red-400",
  neutral: "text-gray-400",
};

export const Terms = [
  "ServDomain is a propietary product of Servatom and is not affiliated with any other company.",
  "ServDomain collects your phone number for authentication purposes only. We do not share your phone number with any third party.",
  <span key={3}>
    ServDomain collects your email address for account management and
    communication purposes only. Your email id is used to create your Stripe
    Customer Account for managing subscriptions. You can read Stripe&apos;s
    Privacy Policy{" "}
    <a
      href="https://stripe.com/in/privacy"
      target="_blank"
      rel="noreferrer"
      className="text-pink-500 underline underline-offset-4"
    >
      here.
    </a>{" "}
  </span>,
  "Servatom cares about your privacy and will not share your data with any third party apart from what has been already specified.",
  "Servatom reserves the right to block any subdomain that is required for internal use by the company.",
  "Servatom reserves the right to block any subdomain that is deemed inappropriate by the company.",
  "Servatom reserves the right to monitor the usage of the subdomain and may suspend or terminate the account if the usage is deemed inappropriate by the company.",
  "Servatom reserves the right to change the pricing at any time without any prior notice. The ongoing plans, however, will continue to be billed at the same price till the end of the billing cycle.",
  "Servatom reserves the right to suspend or terminate your account at any time, if deemed inappropriate or suspicious by the company.",
  "Servatom reserves the right to change the terms and conditions at any time without any prior notice. However, Servatom will ensure prevention of nonsensical monetary losses to its users.",
  "Servatom assumes that you have read and understood the terms and conditions before using the product.",
];
