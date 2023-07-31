import axiosInstance from "@/axios";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email } = body;
  const token = req.cookies.get("token")?.value;

  const result = await axiosInstance
    .post(
      "/user/update-email",
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      console.error(err);
      return new Response(JSON.stringify({ message: "error" }), {
        status: 500,
      });
    });

  return new Response(JSON.stringify({ data: result }), {
    status: 200,
  });
}
