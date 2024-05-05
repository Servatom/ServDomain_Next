import { TStatus } from "@/types/types";

export const STATUS_TEXTS: {
  [key: string]: TStatus;
} = {
  AVAILABLE: {
    variant: "success",
    text: "✓ subdomain is available",
  },
  UNAVAILABLE: {
    variant: "error",
    text: "✕ subdomain is not available",
  },
  ERROR: {
    variant: "error",
    text: "⚠ Something went wrong",
  },
  LOADING: {
    variant: "neutral",
    text: "Checking availability",
  },
  EMPTY: {
    variant: "neutral",
    text: "Enter value to check availability",
  },
  LENGTH: {
    variant: "error",
    text: "Subdomain must be atleast 3 characters long",
  },
};
