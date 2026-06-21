import PendingContentFallback from "@/components/navigation/PendingContentFallback";
import TeacherContactForm from "@/components/teacher/TeacherContactForm";
import { TeacherProfileProps } from "@/types";
import {
  teacherLevelTranslations,
  teacherModalityTranslations,
  teacherSubjectsTranslations,
} from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { FaInstagram } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";


async function TeacherContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/teacher-profiles/${slug}`,
    { next: { revalidate: 60 } },
  );

  if (!res.ok) notFound();

  const teacher: TeacherProfileProps = await res.json();

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="ui-panel flex flex-col items-center space-y-6 p-6 text-center sm:p-8">
        <div className="relative h-24 w-24 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
          {teacher.profilePicture ? (
            <Image
              src={teacher.profilePicture}
              alt={teacher.user.firstName}
              fill
              sizes="96px"
              loading="eager"
              className="object-cover"
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-3xl font-semibold text-slate-500 dark:text-slate-300">
              {teacher.user.firstName[0]}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <p className="ui-eyebrow">Profe</p>
          <h1>
            {teacher.user.firstName} {teacher.user.lastName}
          </h1>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {teacher.level && (
            <span className="ui-chip">
              {teacherLevelTranslations[teacher.level]}
            </span>
          )}
          {teacher.modality && (
            <span className="ui-chip">
              {teacherModalityTranslations[teacher.modality]}
            </span>
          )}
        </div>

        {teacher.subjects && teacher.subjects.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2">
            {teacher.subjects.map((s) => (
              <span key={s} className="ui-chip">
                {teacherSubjectsTranslations[s] ?? s}
              </span>
            ))}
          </div>
        )}

        {teacher.description && (
          <p className="max-w-prose text-sm leading-6 text-slate-600 dark:text-slate-300">
            {teacher.description}
          </p>
        )}

        {teacher.location && (
          <div className="ui-detail-meta w-full justify-center">
            <MdLocationPin />
            <span>{teacher.location}</span>
          </div>
        )}

        {teacher.instagramHandle && (
          <div className="w-full space-y-3 border-t border-black/10 pt-5 dark:border-white/10">
            <p className="ui-eyebrow">Contacto</p>
            <div className="flex flex-col items-center gap-3">
              <Link
                href={`https://instagram.com/${teacher.instagramHandle.replace(/^@/, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ui-detail-meta link justify-center"
              >
                <FaInstagram />
                <span>@{teacher.instagramHandle.replace(/^@/, "")}</span>
              </Link>
            </div>
          </div>
        )}

        <div className="w-full border-t border-black/10 pt-6 text-left dark:border-white/10">
          <p className="ui-eyebrow mb-4">Enviar consulta</p>
          <TeacherContactForm slug={slug} />
        </div>
      </div>
    </div>
  );
}

const TeacherPage = ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => (
  <Suspense fallback={<PendingContentFallback variant="detail" />}>
    <TeacherContent params={params} />
  </Suspense>
);

export default TeacherPage;
