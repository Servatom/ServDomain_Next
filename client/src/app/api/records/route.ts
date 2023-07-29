import axiosInstance from "@/axios";
import { TRecord } from "@/components/types";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const records = await axiosInstance
    .get("/subdomain", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      console.error(err);
    });

  if (!records) {
    return new Response(JSON.stringify({ data: [] }), {
      status: 401,
    });
  }

  return new Response(JSON.stringify({ data: records }), {
    status: 200,
  });
}
