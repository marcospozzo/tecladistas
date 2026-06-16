import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import TeacherCard from "@/components/Cards/TeacherCard";
import { ButtonLink } from "@/components/ui/Button";
import PendingContentFallback from "@/components/navigation/PendingContentFallback";
import { TeacherProfileProps } from "@/types";
import { constants, pageTitles } from "@/utils/utils";
import { getServerSession } from "next-auth";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: pageTitles.classes,
};

async function ClassesContent() {
  const session = await getServerSession(authOptions);
  const isLoggedIn = !!session;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/teacher-profiles`,
    { next: { revalidate: 60 } },
  );
  const teachers: TeacherProfileProps[] = res.ok ? await res.json() : [];

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8">
      <div className="text-center">
        <h1 className="ui-form-title mb-3">Clases</h1>
        <p className="ui-form-description mx-auto max-w-lg">
          Contacta a profes del grupo para coordinar clases.
        </p>
        {isLoggedIn && (
          <div className="mt-5">
            <ButtonLink
              href={constants.TEACHER_PROFILE_PATH}
              variant="secondary"
            >
              Configurar tu perfil de profe
            </ButtonLink>
          </div>
        )}
      </div>

      {teachers.length === 0 ? (
        <p className="mt-12 text-center text-slate-500 dark:text-slate-400">
          Todavía no hay profes disponibles.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {teachers.map((teacher) => (
            <TeacherCard key={teacher._id} teacher={teacher} />
          ))}
        </div>
      )}
    </div>
  );
}

const Classes = () => {
  return (
    <Suspense fallback={<PendingContentFallback variant="list" />}>
      <ClassesContent />
    </Suspense>
  );
};

export default Classes;
