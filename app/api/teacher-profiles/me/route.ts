import { cookieName } from "@/utils/utils";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

async function getCookieHeader() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(cookieName);
  return `${cookie?.name}=${cookie?.value}`;
}

export async function GET() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/teacher-profiles/me`,
      { headers: { cookie: await getCookieHeader() } },
    );
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al obtener perfil" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const formData = await request.formData();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/teacher-profiles/me`,
      {
        method: "PUT",
        headers: { cookie: await getCookieHeader() },
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
