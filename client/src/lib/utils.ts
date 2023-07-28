import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const validatePhoneNumber = (phoneNumber: string) => {
  const regex = /^[0-9]{10}$/;
  return regex.test(phoneNumber);
};

export const validateOtp = (otp: string) => {
  const regex = /^[0-9]{6}$/;
  return regex.test(otp);
};
