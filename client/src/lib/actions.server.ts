import { cookies } from "next/headers";

export async function setCookie(key: string, vaule: string) {
  cookies().set(key, vaule, {
    path: "/",
  });
}
