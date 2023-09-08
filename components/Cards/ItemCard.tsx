import Image from "next/image";
import Link from "next/link";
import { ItemProps } from "@/types";
import { Location } from "@/components";

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
      <h3 className="item-title">{item.title}</h3>
      <div className="flex justify-between">
        <Location name={item.location} />
        <span>
          {Number(item.price).toLocaleString("es-AR", {
            style: "currency",
            currency: "ARS",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
        </span>
      </div>
    </Link>
  );
};

export default ItemCard;
