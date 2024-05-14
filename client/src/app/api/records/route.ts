import { axiosBackendInstance } from "@/axios";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const records = await axiosBackendInstance
    .get("/record", {
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
    return new Response(JSON.stringify([]), {
      status: 401,
    });
  }

  return new Response(JSON.stringify(records), {
    status: 200,
  });
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const body = await req.json();

  try {
    const result = await axiosBackendInstance
      .post("/record", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        return res.data;
      });

    return new Response(JSON.stringify(result), {
      status: 201,
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "error" }), {
      status: 500,
    });
  }
}
