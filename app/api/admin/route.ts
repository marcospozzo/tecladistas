import { cookieName } from "@/utils/utils";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(cookieName);

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin`, {
      headers: {
        cookie: `${cookie?.name}=${cookie?.value}`,
      },
    });

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data, { status: 200 });
    }

    return NextResponse.json(
      { error: "No autorizado" },
      { status: res.status },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al verificar acceso" },
      { status: 500 },
    );
  }
}
