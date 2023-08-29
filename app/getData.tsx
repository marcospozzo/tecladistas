export async function getData(endpoint: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/${endpoint}`);
    return res.json();
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}
