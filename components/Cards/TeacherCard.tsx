import { TeacherProfileProps } from "@/types";
import {
  constants,
  teacherLevelTranslations,
  teacherModalityTranslations,
  teacherSubjectsTranslations,
} from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaPhone } from "react-icons/fa";
import { MdEmail, MdLocationPin } from "react-icons/md";

const MAX_VISIBLE_SUBJECTS = 3;

const TeacherCard = ({ teacher }: { teacher: TeacherProfileProps }) => {
  const visibleSubjects = (teacher.subjects ?? []).slice(0, MAX_VISIBLE_SUBJECTS);
  const extraCount = (teacher.subjects?.length ?? 0) - MAX_VISIBLE_SUBJECTS;

  return (
    <Link
      href={`${constants.CLASSES_PATH}/${teacher.slug}`}
      className="ui-link-card flex flex-col gap-4 p-5"
    >
      <div className="flex items-center gap-4">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
          {teacher.profilePicture ? (
            <Image
              src={teacher.profilePicture}
              alt={teacher.user.firstName}
              fill
              className="object-cover"
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-xl font-semibold text-slate-500 dark:text-slate-300">
              {teacher.user.firstName[0]}
            </span>
          )}
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold tracking-tight dark:text-white">
            {teacher.user.firstName} {teacher.user.lastName}
          </h3>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {teacher.level && (
              <span className="ui-chip text-xs">
                {teacherLevelTranslations[teacher.level]}
              </span>
            )}
            {teacher.modality && (
              <span className="ui-chip text-xs">
                {teacherModalityTranslations[teacher.modality]}
              </span>
            )}
          </div>
        </div>
      </div>

      {visibleSubjects.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {visibleSubjects.map((s) => (
            <span key={s} className="ui-chip text-xs">
              {teacherSubjectsTranslations[s] ?? s}
            </span>
          ))}
          {extraCount > 0 && (
            <span className="ui-chip text-xs">+{extraCount} más</span>
          )}
        </div>
      )}

      <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
        {teacher.location && (
          <div className="flex items-center gap-1 text-sm">
            <MdLocationPin />
            <span>{teacher.location}</span>
          </div>
        )}
        <div className="ml-auto flex items-center gap-2 text-base">
          {teacher.instagramHandle && <FaInstagram />}
          {teacher.user.email && <MdEmail />}
          {teacher.user.phone && <FaPhone />}
        </div>
      </div>
    </Link>
  );
};

export default TeacherCard;
