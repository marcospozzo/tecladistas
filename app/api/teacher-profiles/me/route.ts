import { cookieName } from "@/utils/utils";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

async function getCookieHeader(): Promise<string | null> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(cookieName);
  return cookie ? `${cookie.name}=${cookie.value}` : null;
}

export async function GET() {
  const cookieHeader = await getCookieHeader();
  if (!cookieHeader) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/teacher-profiles/me`,
      { headers: { cookie: cookieHeader } },
    );
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al obtener perfil" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const cookieHeader = await getCookieHeader();
  if (!cookieHeader) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const formData = await request.formData();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/teacher-profiles/me`,
      {
        method: "PUT",
        headers: { cookie: cookieHeader },
        body: formData,
      },
    );
    const data = await res.json();
    if (res.ok) {
      return NextResponse.json(data, { status: 200 });
    }
    return NextResponse.json(
      { error: data.error ?? "Error al actualizar perfil" },
      { status: res.status },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al actualizar perfil" }, { status: 500 });
  }
}
