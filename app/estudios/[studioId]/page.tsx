import { Location, WhatsAppButton } from "@/components";
import { getStudio, getUser } from "@/utils/axios";
import Image from "next/image";
import Link from "next/link";
import { FaGlobeAmericas } from "react-icons/fa";
import { MdPiano } from "react-icons/md";
import { generateMetadata } from "./utils";
export { generateMetadata };

const Studio = async ({ params }: { params: { studioId: string } }) => {
  const studio = await getStudio(params.studioId);
  const user = await getUser(studio.userId!);

  return (
    <div className="item">
      <div className="max-lg:w-full relative w-3/5 h-full">
        <Image
          className="object-contain w-full h-full lg:pr-8 max-h-screen"
          src={studio.images[0]}
          alt={`Imagen que representa al estudio ${studio.name}`}
          width={1000}
          height={1000}
        />
      </div>
      <div className="w-2/5 max-lg:w-full space-y-4">
        <h1>{studio.name}</h1>

        {studio.description && <pre>{studio.description}</pre>}

        {studio.services && (
          <div>
            <h3 className="text-lg mb-2">Servicios:</h3>
            {studio.services.map((service: string, index) => (
              <li key={index}>{service}</li>
            ))}
          </div>
        )}

        <Location name={studio.location} />

        {studio.website && (
          <div className="flex space-x-2">
            <FaGlobeAmericas className="self-center" />
            <Link
              href={studio.website}
              className={"link"}
              target="_blank"
              rel="noopener noreferrer"
            >
              {studio.website}
            </Link>
          </div>
        )}

        <div>
          <div className="flex space-x-1">
            <MdPiano className="self-center" />
            <h3>{user.firstName}</h3>
          </div>
        </div>

        <WhatsAppButton userId={studio.userId!} />
      </div>
    </div>
  );
};

export default Studio;
