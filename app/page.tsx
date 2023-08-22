import { useState, useEffect } from "react";
import { Item } from "@/components";

async function getData() {
  try {
    const res = await fetch("http://localhost:3000/api/items");
    return res.json();
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export default async function Home() {
  const data = await getData();

  if (!data) return <p>No data</p>;

  return (
    <main className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 min-h-screen p-24">
      {data.map((item: { id: any }) => (
        <Item key={item.id} item={item} />
      ))}
    </main>
  );
}
