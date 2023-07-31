import { setCookie } from "@/lib/actions.server";
import { TUser } from "@/types/types";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body: TUser = await req.json();

  if (!body) {
    return new Response(JSON.stringify({ message: "error" }), {
      status: 500,
    });
  }
  setCookie("token", body.token);
  setCookie("isLoggedIn", "true");
  let redirect: string;
  const { searchParams } = new URL(req.url);
  const redirectUrl = searchParams.get("redirect");
  if (!body?.email) {
    console.log("redirecting to complete profile");
    redirect = "/account/complete-profile";
  } else if (redirectUrl) {
    redirect = `/plan/${redirectUrl}`;
  } else redirect = "/";

  return new Response(
    JSON.stringify({ message: "success", redirect: redirect }),
    {
      status: 200,
    }
  );
}
