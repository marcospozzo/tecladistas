import Image from "next/image";
import Link from "next/link";
import { ItemProps } from "@/types";

const ItemCard = ({ item }: { item: ItemProps }) => {
  return (
    <Link
      href={`/${item.id}`}
      className="flex flex-col box-item bg-slate-300 rounded-xl"
    >
      <Image
        className="mx-auto"
        src={"/placeholder-600x400.png"}
        alt={`${item.brand} ${item.category}`}
        width={300}
        height={300}
      />
      <h3>{item.title}</h3>
      <div className="flex justify-between">
        <span>
          {Number(item.price).toLocaleString("es-AR", {
            style: "currency",
            currency: "ARS",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
        </span>
        <span>{item.userId}</span>
      </div>
    </Link>
  );
};

export default ItemCard;
