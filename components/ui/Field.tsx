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
}: FieldProps) {
  return (
    <div className={cn("ui-field-row", className)}>
      {label ? (
        <label
          className={cn("ui-field-label", labelClassName)}
          htmlFor={htmlFor}
        >
          {label}
        </label>
      ) : null}

      <div className={cn("ui-field-control", controlClassName)}>
        {children}
        {error ? <p className="ui-field-error">{error}</p> : null}
        {!error && description ? (
          <p className="ui-field-description">{description}</p>
        ) : null}
      </div>
    </div>
  );
}
