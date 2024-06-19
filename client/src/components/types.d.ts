import { TPlanConfig, TPlanName, TRecordType } from "@/types/types";
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

export interface IPricingCardProps {
  pricing: TPlanConfig;
}
