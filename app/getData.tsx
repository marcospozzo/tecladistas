export async function getData(endpoint: string) {
  try {
    const res = await fetch(`${process.env.API_BASE_URL}${endpoint}`);
    return res.json();
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}
