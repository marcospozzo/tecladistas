import Link from "next/link";
import { ReactNode } from "react";
import { MdArrowOutward } from "react-icons/md";

type HomeSectionProps = {
  children: ReactNode;
  className?: string;
  description?: string;
  eyebrow?: string;
  href?: string;
  linkLabel?: string;
  title: string;
};

export default function HomeSection({
  children,
  className,
  description,
  eyebrow,
  href,
  linkLabel = "Ver todo",
  title,
}: HomeSectionProps) {
  return (
    <section className={`dashboard-panel p-6 sm:p-8 ${className ?? ""}`}>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl space-y-2">
          {eyebrow ? <p className="dashboard-eyebrow">{eyebrow}</p> : null}
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {title}
            </h2>
            {description ? (
              <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                {description}
              </p>
            ) : null}
          </div>
        </div>

        {href ? (
          <Link
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800 transition-opacity hover:opacity-75 dark:text-slate-100"
            href={href}
          >
            {linkLabel}
            <MdArrowOutward className="text-lg" />
          </Link>
        ) : null}
      </div>

      {children}
    </section>
  );
}
