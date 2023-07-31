import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const isLoggedIn = req.cookies.get("isLoggedIn")?.value;
  // get query params
  const { searchParams } = new URL(req.url);
  const plan = searchParams.get("plan");

  if (!isLoggedIn) {
    redirect(`/login?redirect=plan/${plan}`);
  }

  redirect(`/plan/${plan}`);
}
