import { cookieName } from "@/utils/utils";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { id: string; rating: string } }
) {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(cookieName);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/professionals/rate/${params.id}/${params.rating}`,
      {
        method: "post",
        headers: {
          cookie: `${cookie?.name}=${cookie?.value}`,
        },
      }
    );
    return res;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
