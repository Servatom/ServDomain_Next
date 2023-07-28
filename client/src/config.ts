import { IPricingCardProps, TPlan } from "./components/types";
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

export const Terms = [
  "ServDomain is a propietary product of Servatom and is not affiliated with any other company.",
  "Servatom cares about your privacy and will not share your data with any third party.",
  "Servatom reserves the right to block any subdomain that is required for internal use by the company.",
  "Servatom reserves the right to block any subdomain that is deemed inappropriate by the company.",
  "Servatom reserves the right to monitor the usage of the subdomain and may suspend or terminate the account if the usage is deemed inappropriate by the company.",
  "Servatom reserves the right to change the pricing at any time without any prior notice. The ongoing plans, however, will continue to be billed at the same price till the end of the billing cycle.",
  "Servatom reserves the right to suspend or terminate your account at any time, if deemed inappropriate or suspicious by the company.",
  "Servatom reserves the right to change the terms and conditions at any time without any prior notice. However, Servatom will ensure prevention of nonsensical monetary losses to its users.",
  "Servatom assumes that you have read and understood the terms and conditions before using the product.",
];
