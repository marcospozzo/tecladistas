import Image from "next/image";
import Link from "next/link";
import { ItemProps } from "@/types";
import { Location } from "@/components";
import { formatPrice } from "@/utils/utils";
import { FaArrowsRotate } from "react-icons/fa6";

const ItemCard = ({ item }: { item: ItemProps }) => {
  return (
    <Link
      href={`/${item.id}`}
      className="flex flex-col box-item bg-slate-300 rounded-xl"
    >
      <div className="relative inline-block">
        <Image
          className="mx-auto"
          src={"/placeholder-600x400.png"}
          alt={`${item.brand} item`}
          width={300}
          height={300}
        />
        {item.exchanges && (
          <div className="absolute z-10 -top-2 -right-2">
            <FaArrowsRotate size={25} />
          </div>
        )}
      </div>
      <h3 className="item-title">{item.title}</h3>
      <div className="flex justify-between">
        {item.location && <Location name={item.location} />}
        <span>{formatPrice(item.price)}</span>
      </div>
    </Link>
  );
};

export default ItemCard;
