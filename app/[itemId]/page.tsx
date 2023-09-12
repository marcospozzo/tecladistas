import { Location } from "@/components";
import { WHATSAPP_LINK } from "@/utils/constants";
import { getData } from "@/utils/getData";
import { formatPhone, formatPrice } from "@/utils/utils";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Image from "next/image";
import Link from "next/link";
import { FaUserAlt } from "react-icons/fa";
import { FaArrowsRotate, FaWhatsapp } from "react-icons/fa6";

const Item = async ({ params }: Params) => {
  const item = await getData(`/products/${params.itemId}`);
  const user = await getData(`/users/${item.userId}`);

  return (
    <div className="item-and-studio">
      <div className="max-lg:w-full relative w-2/3 h-full">
        <Image
          className="object-contain w-full h-full sm:pr-8 max-h-screen"
          src={item.pictures[0]}
          alt={`${item.brand} ${item.model} item`}
          width={500}
          height={500}
        />
      </div>
      <div className="w-1/3 max-lg:w-full space-y-4">
        <h1>{item.title}</h1>

        {item.price && <h1 className="text-4xl">{formatPrice(item.price)}</h1>}

        {item.exchanges && (
          <div className="flex space-x-1">
            <FaArrowsRotate className="self-center" />
            <i className="self-center">
              Escucha propuestas de intercambio, como parte de pago.
            </i>
          </div>
        )}

        <p>{item.description}</p>

        {item.year && <div>Año: {item.year}</div>}
        <Location name={item.location} />

        <div>
          <div className="flex space-x-1 space-y-2">
            <FaUserAlt className="self-center" />
            <h3>
              {user.firstName} {user.lastName}:
            </h3>
            <h3>{user.phone}</h3>
          </div>
        </div>
        <div className="flex flex-col text-lg space-x-1 max-sm:justify-center justify-start">
          <Link
            className="flex justify-center submit-button space-x-2"
            href={`${WHATSAPP_LINK}${formatPhone(user.phone)}`}
            target="_blank" // This opens the link in a new tab
            rel="noopener noreferrer" // Adds security to prevent security risks
          >
            <h3 className="text-base">Abrir</h3>
            <FaWhatsapp size={25} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Item;
