import { WHATSAPP_LINK } from "@/utils/constants";
import { formatPhone } from "@/utils/utils";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${params.userId}`,
      {
        headers: {
          "authorization": `${process.env.NEXT_SECRET}`,
        },
      }
    );
    const data = await res.json();
    return NextResponse.redirect(`${WHATSAPP_LINK}${formatPhone(data.phone)}`);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
