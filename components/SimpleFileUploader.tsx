"use client";

import * as React from "react";

function getFileExtension(fileName: string) {
  const segments = fileName.split(".");

  return segments.length > 1 ? segments.pop()?.toLowerCase() ?? "" : "";
}

type SimpleFileUploaderProps = {
  classes?: string;
  handleChange: (file: File | null) => void;
  id: string;
  label: string;
  maxSize?: number;
  name: string;
  required?: boolean;
  types?: string[];
};

export default function SimpleFileUploader({
  classes,
  handleChange,
  id,
  label,
  maxSize,
  name,
  required = false,
  types = [],
}: SimpleFileUploaderProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [selectedFileName, setSelectedFileName] = React.useState<string | null>(
    null
  );

  const acceptedTypes = React.useMemo(
    () => types.map((type) => type.toLowerCase()),
    [types]
  );
  const accept = React.useMemo(
    () => acceptedTypes.map((type) => `.${type}`).join(","),
    [acceptedTypes]
  );

  const validateAndSetFile = React.useCallback(
    (file: File | null) => {
      if (!file) {
        setErrorMessage(null);
        setSelectedFileName(null);
        handleChange(null);
        return;
      }

      const fileExtension = getFileExtension(file.name);
      const fileSizeInMb = file.size / 1024 / 1024;

      if (
        acceptedTypes.length > 0 &&
        (!fileExtension || !acceptedTypes.includes(fileExtension))
      ) {
        setErrorMessage("Formato no soportado. Usar JPG, JPEG o PNG.");
        setSelectedFileName(null);
        handleChange(null);
        if (inputRef.current) {
          inputRef.current.value = "";
        }
        return;
      }

      if (maxSize && fileSizeInMb > maxSize) {
        setErrorMessage(`La imagen supera el maximo de ${maxSize} MB.`);
        setSelectedFileName(null);
        handleChange(null);
        if (inputRef.current) {
          inputRef.current.value = "";
        }
        return;
      }

      setErrorMessage(null);
      setSelectedFileName(file.name);
      handleChange(file);
    },
    [acceptedTypes, handleChange, maxSize]
  );

  return (
    <div className={`w-full ${classes ?? ""}`}>
      <input
        accept={accept || undefined}
        className="sr-only"
        id={id}
        name={name}
        onChange={(event) =>
          validateAndSetFile(event.target.files?.[0] ?? null)
        }
        ref={inputRef}
        required={required}
        type="file"
      />
      <label
        className={`flex min-h-12 cursor-pointer items-center justify-between rounded-xl border-2 border-dashed px-4 py-3 transition ${
          errorMessage
            ? "border-red-500 bg-red-50 text-red-700"
            : isDragging
            ? "border-sky-500 bg-sky-50 text-sky-700"
            : "border-gray-400 bg-white text-black dark:border-slate-400 dark:bg-slate-600 dark:text-white"
        }`}
        htmlFor={id}
        onDragEnter={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          validateAndSetFile(event.dataTransfer.files?.[0] ?? null);
        }}
      >
        <span className="truncate pr-4">
          {selectedFileName ?? label}
        </span>
        <span className="text-sm underline">Elegir</span>
      </label>
      <div className="mt-2 text-sm">
        {errorMessage ? (
          <span className="text-red-600">{errorMessage}</span>
        ) : (
          <span className="text-slate-600 dark:text-slate-200">
            Formatos permitidos: {types.join(", ")}. Maximo: {maxSize} MB.
          </span>
        )}
      </div>
    </div>
  );
}
