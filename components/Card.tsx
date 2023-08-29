import Image from "next/image";
import Link from "next/link";
import { ItemProps } from "@/types";

const Card = ({ item }: { item: ItemProps }) => {
  return (
    <Link
      href={`/item/${item.id}`}
      className="flex flex-col space-y-4 m-5 p-8 bg-slate-300 rounded-xl"
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
        <span>{`$ ${item.price}`}</span>
        <span>{item.userId}</span>
      </div>
    </Link>
  );
};

export default Card;
