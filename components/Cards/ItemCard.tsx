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
      className="flex flex-col box-item bg-slate-300 rounded-xl relative"
      scroll={true}
    >
      <div className=" w-full h-48 bg-white overflow-hidden">
        <Image
          className="object-contain w-full h-full box-item-image"
          src={item.pictures ? item.pictures[0] : ""}
          alt={`${item.brand} item`}
          width={300}
          height={300}
        />
      </div>
      {item.exchanges && (
        <div className="absolute z-10 top-1 right-5">
          <FaArrowsRotate size={25} />
        </div>
      )}
      <h3 className="item-title">{item.title}</h3>
      <div className="flex justify-between">
        {item.location && <Location name={item.location} />}
        {item.price && <span>{formatPrice(item.price)}</span>}
      </div>
    </Link>
  );
};

export default ItemCard;
