import { TPlanName } from "@/types/types";
import { ButtonHTMLAttributes, HTMLAttributes } from "react";

export interface IDynamicInputProps extends HTMLAttributes<HTMLInputElement> {
  enablePlaceholderAnimation?: boolean;
  size?: number;
  value: string;
  type: string;
  onSearch: (value: string) => void;
}

export interface ILoaderProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export type TPlanFrequency = "Daily" | "Monthly" | "Yearly";
export type TPlan = {
  id: number;
  name: string;
  price: number;
  frequency: TPlanFrequency;
  features: string[];
};

export interface IPricingCardProps {
  pricing: TPlan;
}

export type TStatus = {
  variant: "success" | "error" | "neutral";
  text: string;
};

export type TRecord = {
  id: string;
  type: "A" | "CNAME";
  name: string;
  content: string;
  expiry: string;
  plan: TPlanName;
};
