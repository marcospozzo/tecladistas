import { cookieName } from "@/utils/utils";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { professionalId: string } }
) {
  const cookieStore = cookies();
  const cookie = cookieStore.get(cookieName);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/professionals/rate-down/${params.professionalId}`,
      {
        method: "post",
        headers: {
          "cookie": `${cookie?.name}=${cookie?.value}`,
        },
      }
    );
    return res;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
