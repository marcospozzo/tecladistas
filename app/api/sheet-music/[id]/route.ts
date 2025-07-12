import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/sheet-music/${params.id}`,
      {
        headers: {
          authorization: `${process.env.NEXT_SECRET}`,
          "Cache-Control": "no-cache",
        },
      }
    );
    return NextResponse.redirect(res.url);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
