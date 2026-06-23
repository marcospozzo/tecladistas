"use client";

import { Button } from "@/components/ui/Button";

const Error = ({ reset }: { reset: () => void }) => (
  <div className="flex justify-center px-4 py-16">
    <div className="ui-panel flex max-w-sm flex-col items-center gap-6 p-8 text-center">
      <p className="ui-eyebrow">Mantenimiento</p>
      <p className="text-slate-600 dark:text-slate-300">
        El sitio está en mantenimiento.
        <br />
        Por favor, reintentá más tarde.
      </p>
    </div>
  </div>
);

export default Error;
