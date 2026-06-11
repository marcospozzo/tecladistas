import { constants } from "@/utils/utils";
import { formatPhone } from "@/utils/utils";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  context: { params: Promise<{ userId: string; text: string }> }
) {
  const { userId, text } = await context.params;

  // Limit message length to prevent open redirect abuse
  const safeText = text.slice(0, 500);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${userId}`,
      {
        headers: {
          authorization: `${process.env.NEXT_SECRET}`,
        },
      }
    );

    if (!res.ok) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });

    const data = await res.json();
    const url = `${constants.WHATSAPP_LINK}${formatPhone(
      data.phone
    )}?text=${encodeURIComponent(safeText)}`;

    return NextResponse.redirect(url);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al abrir WhatsApp" }, { status: 500 });
  }
}
