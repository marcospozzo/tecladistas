import { CustomThumb, WhatsAppButton } from "@/components";
import { getProfessional } from "@/utils/axios";
import Link from "next/link";
import { FaGlobeAmericas, FaPhone, FaStarHalfAlt } from "react-icons/fa";
import { MdEmail, MdLocationPin, MdPiano } from "react-icons/md";
import { Metadata } from "next";
import { calculateRating, countTotalRatings, pageTitles } from "@/utils/utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export const metadata: Metadata = {
  title: pageTitles.professionals,
};

const Professional = async ({
  params,
}: {
  params: { professionalId: string };
}) => {
  const professional = await getProfessional(params.professionalId);
  const session = await getServerSession(authOptions);
  const userId = session?.user.id ?? "";

  return (
    <div className="flex flex-col w-full items-center m-auto">
      <div className="flex flex-col bg-slate-300 rounded-xl p-6 space-y-1 box-item">
        <h1 className="self-center mb-4">
          {professional.firstName}{" "}
          {professional.nickname && `"${professional.nickname}"`}{" "}
          {professional.lastName}
        </h1>
        {professional.phone && (
          <div className="flex space-x-1 w-full self-start">
            <FaPhone className="self-center" />
            <h3>{professional.phone}</h3>
          </div>
        )}
        {professional.phone && <WhatsAppButton phone={professional.phone} />}
        {professional.isTecladista && (
          <div className="flex space-x-2">
            <MdPiano className="self-center" />
            <i>Pst, ¡es del grupo!</i>
          </div>
        )}
        {professional.email && (
          <div className="flex space-x-2">
            <MdEmail className="self-center" />
            <Link
              href={`mailto:${professional.email}`}
              className={"link"}
              target="_blank"
              rel="noopener noreferrer"
            >
              {professional.email}
            </Link>
          </div>
        )}
        {professional.website && (
          <div className="flex space-x-2">
            <FaGlobeAmericas className="self-center" />
            <Link
              href={professional.website}
              className={"link"}
              target="_blank"
              rel="noopener noreferrer"
            >
              {professional.website}
            </Link>
          </div>
        )}
        {professional.location && (
          <div className="flex space-x-2">
            <MdLocationPin className="self-center" />
            <h3>{professional.location}</h3>
          </div>
        )}
        <div className="flex space-x-2">
          <FaStarHalfAlt className="self-center" />
          <b>{`${calculateRating(professional)}/5 (${countTotalRatings(
            professional
          )})`}</b>
        </div>
        <div className="flex flex-col space-y-3">
          <h2 className="self-center mt-4">
            Calificar a {professional.firstName}:
          </h2>
          <div className="flex justify-center space-x-4">
            <CustomThumb
              type="up"
              isRated={professional.ratesUp?.includes(userId)}
              professionalId={professional._id}
            />
            <CustomThumb
              type="down"
              isRated={professional.ratesDown?.includes(userId)}
              professionalId={professional._id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Professional;
