import { cookieName } from "@/utils/utils";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  const cookieStore = cookies();
  const cookie = cookieStore.get(cookieName);

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  console.log({ searchParams, id });

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${id}`,
      {
        method: "delete",
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
