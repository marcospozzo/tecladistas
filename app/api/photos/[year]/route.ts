import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { year: string } }
) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/photos/${params.year}`,
      {
        headers: {
          authorization: `${process.env.NEXT_SECRET}`,
        },
      }
    );
    return res;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
