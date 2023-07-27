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
