import { setCookie } from "@/lib/actions.server";
import { TUser } from "@/types/types";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body: TUser = await req.json();

  setCookie("token", body.token);
  return new Response(JSON.stringify({ message: "success" }));
}
