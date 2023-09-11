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
    <div className="flex max-lg:flex-col max-lg:space-y-4 lg:space-x-4">
      <div className="w-1/2 max-lg:w-full">
        <Image
          className="mx-auto"
          src={item.pictures[0]}
          alt={`${item.brand} ${item.model} item`}
          width={500}
          height={500}
        />
      </div>
      <div className="w-1/2 max-lg:w-full space-y-4">
        <h1>{item.title}</h1>

        <h1 className="text-4xl">{formatPrice(item.price)}</h1>

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

        <div className="flex space-x-1">
          <FaUserAlt className="self-center" />
          <h3>
            {user.firstName} {user.lastName}:
          </h3>
          <h3>{user.phone}</h3>
        </div>

        <div className="flex flex-col text-lg space-x-1">
          <Link
            className="flex w-fit justify-center submit-button space-x-2"
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
