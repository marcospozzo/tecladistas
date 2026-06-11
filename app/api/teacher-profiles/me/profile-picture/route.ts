import { cookieName } from "@/utils/utils";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

async function getCookieHeader(): Promise<string | null> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(cookieName);
  return cookie ? `${cookie.name}=${cookie.value}` : null;
}

export async function DELETE() {
  const cookieHeader = await getCookieHeader();
  if (!cookieHeader) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/teacher-profiles/me/profile-picture`,
      {
        method: "DELETE",
        headers: { cookie: cookieHeader },
      },
    );
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al eliminar foto de perfil" },
      { status: 500 },
    );
  }
}
