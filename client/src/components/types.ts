import { HTMLAttributes } from "react";

export interface IDynamicInputProps extends HTMLAttributes<HTMLInputElement> {
  enablePlaceholderAnimation?: boolean;
  size: number;
  value: string;
  type: string;
  onSearch: (value: string) => void;
}
