import { cookieName } from "@/utils/utils";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();

  const cookieStore = cookies();
  const cookie = cookieStore.get(cookieName);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/create-whitelisted`,
      {
        method: "post",
        headers: {
          "cookie": `${cookie?.name}=${cookie?.value}`,
        },
        body: formData,
      }
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
      return NextResponse.json({ success: "Usuario creado" }, { status: 201 });
    } else {
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al intentar crear usuario" },
      { status: 500 }
    );
  }
}
