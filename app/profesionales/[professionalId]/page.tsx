import { WhatsAppButton } from "@/components";
import { getProfessional } from "@/utils/axios";
import Link from "next/link";
import { FaGlobeAmericas, FaPhone, FaStarHalfAlt } from "react-icons/fa";
import { MdEmail, MdLocationPin, MdPiano } from "react-icons/md";
import { Metadata } from "next";
import { pageTitles } from "@/utils/utils";

export const metadata: Metadata = {
  title: pageTitles.professionals,
};

const Professional = async ({
  params,
}: {
  params: { professionalId: string };
}) => {
  const professional = await getProfessional(params.professionalId);

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
            <Link href={`mailto:${professional.email}`} className={"link"}>
              {professional.email}
            </Link>
          </div>
        )}
        {professional.website && (
          <div className="flex space-x-2">
            <FaGlobeAmericas className="self-center" />
            <Link href={professional.website} className={"link"}>
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
          <i>(próximamente)</i>
        </div>
        {/* <h2>Categorías</h2>
      {professional.skills.map((skill) => (
        <li key={skill}>{skillsTranslations[skill]}</li>
      ))} */}
      </div>
    </div>
  );
};

export default Professional;
