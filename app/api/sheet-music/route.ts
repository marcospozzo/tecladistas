import { cookieName } from "@/utils/utils";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(cookieName);

  const formData = await request.formData();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/sheet-music/upload`,
      {
        method: "POST",
        body: formData,
        headers: {
          cookie: `${cookie?.name}=${cookie?.value}`,
        },
      },
    );
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al subir partitura" }, { status: 500 });
  }
}
