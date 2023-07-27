import { IPricingCardProps, TPlan } from "./types";

export const features = {
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
