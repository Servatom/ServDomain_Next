import axiosInstance from "@/axios";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const subdomain = searchParams.get("subdomain");
  const result = await axiosInstance
    .get(`/subdomain/check?subdomain=${subdomain}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error(err);
      // return err;

      return new Response(JSON.stringify({ message: "error" }), {
        status: 500,
      });
    });

  return new Response(JSON.stringify({ isAvailable: result.available }), {
    status: 200,
  });
}
