import { constants } from "@/utils/utils";
import { formatPhone } from "@/utils/utils";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  context: { params: { userId: string; text: string } }
) {
  const { userId, text } = context.params;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${userId}`,
      {
        headers: {
          authorization: `${process.env.NEXT_SECRET}`,
        },
      }
    );

    const data = await res.json();
    const url = `${constants.WHATSAPP_LINK}${formatPhone(
      data.phone
    )}?text=${encodeURIComponent(text)}`;

    return NextResponse.redirect(url);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
