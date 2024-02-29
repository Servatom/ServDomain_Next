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

export const validateHostname = (hostname: string) => {
  const regex =
    /^([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])(\.[a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])+\.[a-zA-Z]{2,}$/;
  return regex.test(hostname);
};

export const validateSubdomain = (subdomain: string) => {
  const regex = /^[a-zA-z][a-zA-Z0-9]+((\.|\-)[a-zA-Z0-9]+)*$/;
  return regex.test(subdomain);
};

export const validateIPv4 = (ip: string) => {
  const regex = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/;
  if (regex.test(ip)) {
    const parts = ip.split(".");
    if (
      parts.some(function (value) {
        return parseInt(value) > 255;
      })
    ) {
      return false;
    }
    return true;
  }

  return false;
};

export const validateTxtRecord = (txt: string) => {
  const regex = /^[a-zA-Z0-9]+=[a-zA-Z0-9]+$/;
  return regex.test(txt);
};
