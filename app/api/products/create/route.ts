import { cookieName } from "@/utils/utils";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const cookieStore = cookies();
  const cookie = cookieStore.get(cookieName);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/create`,
      {
        method: "post",
        headers: {
          cookie: `${cookie?.name}=${cookie?.value}`,
        },
        body: formData,
      }
    );
    return res;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
