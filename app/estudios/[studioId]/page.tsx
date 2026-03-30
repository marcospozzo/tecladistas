import { Location, WhatsAppButton } from "@/components";
import DefensiveImage from "@/components/DefensiveImage";
import { getStudio, getUser } from "@/utils/axios";
import Link from "next/link";
import { FaGlobeAmericas } from "react-icons/fa";
import { MdPiano } from "react-icons/md";
import { generateMetadata } from "./utils";
import { studioMessage } from "@/utils/utils";
export { generateMetadata };

const Studio = async ({
  params,
}: {
  params: Promise<{ studioId: string }>;
}) => {
  const { studioId } = await params;
  const studio = await getStudio(studioId);
  const user = await getUser(studio.userId!);

  return (
    <div className="ui-detail-layout">
      <div className="ui-detail-media min-h-[420px]">
        <DefensiveImage
          alt={`Imagen que representa al estudio ${studio.name}`}
          className="h-full w-full object-contain"
          height={1000}
          src={studio.images?.[0]}
          width={1000}
        />
      </div>
      <div className="ui-detail-sidebar space-y-5">
        <div className="space-y-2">
          <p className="ui-eyebrow">Estudio</p>
          <h1>{studio.name}</h1>
        </div>

        {studio.description && (
          <pre className="text-sm leading-7 text-slate-700 dark:text-slate-200">
            {studio.description}
          </pre>
        )}

        {studio.services && (
          <div>
            <h3 className="mb-2 text-lg font-semibold">Servicios</h3>
            <div className="flex flex-wrap gap-2">
              {studio.services.map((service: string, index) => (
                <span className="ui-chip" key={index}>
                  {service}
                </span>
              ))}
            </div>
          </div>
        )}

        <Location name={studio.location} />

        {studio.website && (
          <div className="ui-detail-meta">
            <FaGlobeAmericas className="self-center" />
            <Link
              className={"link"}
              href={studio.website}
              rel="noopener noreferrer"
              target="_blank"
            >
              {studio.website}
            </Link>
          </div>
        )}

        <div className="ui-detail-meta">
          <MdPiano className="self-center" />
          <h3>{user.firstName}</h3>
        </div>

        <div className="ui-detail-actions">
          <WhatsAppButton
            userId={studio.userId}
            message={studioMessage(user.firstName, studio.name)}
          />
        </div>
      </div>
    </div>
  );
};

export default Studio;
