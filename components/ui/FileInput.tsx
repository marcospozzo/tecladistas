import { ChangeEventHandler, forwardRef } from "react";
import { cn } from "./cn";

type FileInputProps = {
  accept?: string;
  className?: string;
  id?: string;
  name: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
};

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  function FileInput(
    { accept, className, id, name, onChange, required = false },
    ref,
  ) {
    return (
      <input
        accept={accept}
        className={cn(
          "ui-input block w-full cursor-pointer p-2 file:mr-3 file:rounded-full file:border-0 file:bg-slate-950 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white file:transition hover:file:bg-slate-700 dark:file:bg-white dark:file:text-slate-950 dark:hover:file:bg-slate-200",
          className,
        )}
        id={id}
        name={name}
        onChange={onChange}
        ref={ref}
        required={required}
        type="file"
      />
    );
  },
);

export default FileInput;
