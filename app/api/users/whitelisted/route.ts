import { cookieName } from "@/utils/utils";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

async function fetchWhitelistedCount(cookie: RequestCookie): Promise<number> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/count-whitelisted-users`,
      { headers: { cookie: `${cookie.name}=${cookie.value}` } },
    );
    const data = await res.json();
    return data.count ?? 0;
  } catch {
    return 0;
  }
}

export async function POST(request: Request) {
  const formData = await request.formData();

  const cookieStore = await cookies();
  const cookie = cookieStore.get(cookieName);
  if (!cookie) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/whitelisted`,
      {
        method: "post",
        headers: {
          cookie: `${cookie.name}=${cookie.value}`,
        },
        body: formData,
      },
    );
    const data = await res.json();
    let errorMessage = "";
    if (data.code === 11000) {
      errorMessage = "Celular ya existe";
    }
    if (data.name) {
      errorMessage = `Error: ${data.name}`;
    }
    if (data.error) {
      errorMessage = `Error: ${data.error}`;
    }
    if (res.ok) {
      const count = await fetchWhitelistedCount(cookie);
      return NextResponse.json({ success: "Usuario creado", count }, { status: 201 });
    } else {
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al intentar crear usuario" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  const formData = await request.formData();

  const cookieStore = await cookies();
  const cookie = cookieStore.get(cookieName);
  if (!cookie) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/whitelisted`,
      {
        method: "delete",
        headers: {
          cookie: `${cookie.name}=${cookie.value}`,
        },
        body: formData,
      },
    );
    const data = await res.json();
    let errorMessage = "";
    if (data.deletedCount === 0) {
      errorMessage = `Error: usuario no fue eliminado`;
    }
    if (res.ok && data.deletedCount === 1) {
      const count = await fetchWhitelistedCount(cookie);
      return NextResponse.json(
        { success: "Usuario eliminado", count },
        { status: 200 },
      );
    } else {
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al intentar eliminar usuario" },
      { status: 500 },
    );
  }
}
