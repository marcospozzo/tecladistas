import { ReactNode } from "react";
import { cn } from "./cn";

type FormShellProps = {
  children: ReactNode;
  className?: string;
  description?: string;
  eyebrow?: string;
  size?: "default" | "narrow" | "wide";
  title: string;
};

const sizeClasses = {
  default: "max-w-3xl",
  narrow: "max-w-xl",
  wide: "max-w-4xl",
};

export default function FormShell({
  children,
  className,
  description,
  eyebrow,
  size = "default",
  title,
}: FormShellProps) {
  return (
    <section className={cn("ui-form-shell", sizeClasses[size], className)}>
      <div className="ui-panel p-6 sm:p-8 lg:p-10">
        <div className="ui-form-header">
          {eyebrow ? <p className="ui-eyebrow">{eyebrow}</p> : null}
          <div className="space-y-3">
            <h1 className="ui-form-title">{title}</h1>
            {description ? (
              <p className="ui-form-description">{description}</p>
            ) : null}
          </div>
        </div>

        {children}
      </div>
    </section>
  );
}
