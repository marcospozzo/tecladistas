import { Card } from "@/components";
import { ItemProps } from "@/types";

async function getData() {
  try {
    const res = await fetch("http://localhost:3000/api/cards");
    return res.json();
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export default async function Cards() {
  const data = await getData();

  return (
    <main className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 min-h-screen p-24">
      {data?.map((item: ItemProps) => (
        <Card key={item.id} item={item} />
      ))}
    </main>
  );
}
