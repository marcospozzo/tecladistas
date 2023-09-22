export async function getData(endpoint: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`,
      { cache: "no-store" }
    );
    return res.json();
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}
