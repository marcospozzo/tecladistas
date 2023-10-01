import { Location } from "@/components";
import { WHATSAPP_LINK } from "@/utils/constants";
import { getData } from "@/utils/getData";
import { formatPhone, servicesTranslation } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import { MdPiano } from "react-icons/md";

const Studio = async ({ params }: { params: { studioId: string } }) => {
  const studio = await getData(`/studios/${params.studioId}`);
  const user = await getData(`/users/${studio.userId}`);

  return (
    <div className="item">
      <div className="max-lg:w-full relative w-2/3 h-full">
        <Image
          className="object-contain w-full h-full lg:pr-8 max-h-screen"
          src={studio.images[0]}
          alt={`Imagen que representa al estudio ${studio.name}`}
          width={500}
          height={500}
        />
      </div>
      <div className="w-1/3 max-lg:w-full space-y-4">
        <h1>{studio.name}</h1>

        <p>{studio.description}</p>

        {studio.services && (
          <div>
            <h3 className="text-lg mb-2">Servicios:</h3>
            {studio.services.map((service: string) => (
              <li key={service}>{servicesTranslation[service]}</li>
            ))}
          </div>
        )}

        <Location name={studio.location} />

        <div>
          <div className="flex space-x-1">
            <MdPiano className="self-center" />
            <h3>{user.firstName}:</h3>
            <h3>{user.phone}</h3>
          </div>
        </div>
        <div className="flex flex-col text-lg space-x-1">
          <Link
            className="flex justify-center submit-button space-x-2"
            href={`${WHATSAPP_LINK}${formatPhone(user.phone)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3 className="text-base">Abrir</h3>
            <FaWhatsapp size={25} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Studio;
