import { cookieName } from "@/utils/utils";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();

  const cookieStore = cookies();
  const cookie = cookieStore.get(cookieName);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/delete-whitelisted`,
      {
        method: "post",
        headers: {
          cookie: `${cookie?.name}=${cookie?.value}`,
        },
        body: formData,
      }
    );
    const data = await res.json();
    let errorMessage = "";
    if (data.deletedCount === 0) {
      errorMessage = `Error: usuario no fue eliminado`;
    }
    if (res.ok && data.deletedCount === 1) {
      return NextResponse.json(
        { success: "Usuario eliminado" },
        { status: 201 }
      );
    } else {
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al intentar eliminar usuario" },
      { status: 500 }
    );
  }
}
