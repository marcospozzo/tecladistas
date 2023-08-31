import { Card } from "@/components";
import { ItemProps } from "@/types";

export default async function Cards({ data }: { data: Array<ItemProps> }) {
  return (
    <main className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4">
      {data?.map((item: ItemProps) => (
        <Card key={item.id} item={item} />
      ))}
    </main>
  );
}
