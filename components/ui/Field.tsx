import { ReactNode } from "react";
import { cn } from "./cn";

type FieldProps = {
  children: ReactNode;
  className?: string;
  controlClassName?: string;
  description?: ReactNode;
  error?: ReactNode;
  htmlFor?: string;
  label?: ReactNode;
  labelClassName?: string;
  required?: boolean;
};

export default function Field({
  children,
  className,
  controlClassName,
  description,
  error,
  htmlFor,
  label,
  labelClassName,
  required = false,
}: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="ui-field-row">
        {label ? (
          <label
            className={cn("ui-field-label", labelClassName)}
            htmlFor={htmlFor}
          >
            <>
              {label}
              {required ? (
                <span aria-hidden="true" className="ml-1 text-red-600 dark:text-red-300">
                  *
                </span>
              ) : null}
            </>
          </label>
        ) : null}

        <div className={cn("ui-field-control", controlClassName)}>{children}</div>
      </div>

      {error ? (
        <div className={label ? "sm:pl-[11.5rem]" : undefined}>
          <p className="ui-field-error">{error}</p>
        </div>
      ) : null}

      {!error && description ? (
        <div className={label ? "sm:pl-[11.5rem]" : undefined}>
          <p className="ui-field-description">{description}</p>
        </div>
      ) : null}
    </div>
  );
}
