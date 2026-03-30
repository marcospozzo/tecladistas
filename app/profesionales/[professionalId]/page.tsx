import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { ProfessionalRating, WhatsAppButton } from "@/components";
import { getProfessional } from "@/utils/axios";
import { calculateRating, pageTitles } from "@/utils/utils";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { FaGlobeAmericas, FaPhone, FaStar } from "react-icons/fa";
import { MdEmail, MdLocationPin, MdPiano } from "react-icons/md";

export const metadata: Metadata = {
  title: pageTitles.professionals,
};

const Professional = async ({
  params,
}: {
  params: Promise<{ professionalId: string }>;
}) => {
  const { professionalId } = await params;
  const professional = await getProfessional(professionalId);
  const session = await getServerSession(authOptions);
  const userId = session?.user.id ?? "";

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="ui-panel flex flex-col space-y-5 p-6 sm:p-8">
        <div className="space-y-2 text-center">
          <p className="ui-eyebrow">Profesional</p>
          <h1>
            {professional.firstName}{" "}
            {professional.nickname && `"${professional.nickname}"`}{" "}
            {professional.lastName}
          </h1>
        </div>
        {professional.phone && (
          <div className="ui-detail-meta w-full self-start">
            <FaPhone className="self-center" />
            <h3>{professional.phone}</h3>
          </div>
        )}
        {professional.phone && <WhatsAppButton phone={professional.phone} />}
        {professional.isTecladista && (
          <div className="ui-chip w-fit">
            <MdPiano className="self-center" />
            <i>Pst, ¡es del grupo!</i>
          </div>
        )}
        {professional.email && (
          <div className="ui-detail-meta">
            <MdEmail className="self-center" />
            <Link
              className={"link"}
              href={`mailto:${professional.email}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              {professional.email}
            </Link>
          </div>
        )}
        {professional.website && (
          <div className="ui-detail-meta">
            <FaGlobeAmericas className="self-center" />
            <Link
              className={"link"}
              href={professional.website}
              rel="noopener noreferrer"
              target="_blank"
            >
              {professional.website}
            </Link>
          </div>
        )}
        {professional.location && (
          <div className="ui-detail-meta">
            <MdLocationPin className="self-center" />
            <h3>{professional.location}</h3>
          </div>
        )}
        <ProfessionalRating
          id={professional._id}
          value={
            professional.ratings?.find((rating) => rating.userId === userId)
              ?.rating
          }
        />
        <div className="ui-chip flex w-fit self-center space-x-1">
          <h3>{calculateRating(professional.ratings)}</h3>
          <FaStar className="self-center" />
          <h3>
            {`(${professional.ratings?.length} ${
              professional.ratings?.length === 1
                ? "calificación"
                : "calificaciones"
            })`}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Professional;
