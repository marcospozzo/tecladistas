import { cookieName } from "@/utils/utils";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: { year: string } }
) {
  const cookieStore = cookies();
  const cookie = cookieStore.get(cookieName);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/photos/${params.year}`,
      {
        headers: {
          cookie: `${cookie?.name}=${cookie?.value}`,
          authorization: `${process.env.NEXT_SECRET}`,
          "accept-encoding": "gzip, deflate",
        },
      }
    );
    return res;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
