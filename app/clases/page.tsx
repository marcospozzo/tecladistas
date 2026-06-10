import TeacherCard from "@/components/Cards/TeacherCard";
import PendingContentFallback from "@/components/navigation/PendingContentFallback";
import { TeacherProfileProps } from "@/types";
import { pageTitles } from "@/utils/utils";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: pageTitles.classes,
};

async function ClassesContent() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/teacher-profiles`,
    { next: { revalidate: 60 } },
  );
  const teachers: TeacherProfileProps[] = res.ok ? await res.json() : [];

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8">
      <div className="text-center">
        <p className="ui-eyebrow mb-2">Directorio</p>
        <h1 className="ui-form-title mb-3">Clases</h1>
        <p className="ui-form-description mx-auto max-w-lg">
          Tecladistas del grupo que enseñan. Contactalos directamente para
          coordinar clases.
        </p>
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
