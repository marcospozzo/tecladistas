"use client";

import { useEffect } from "react";
import { useNavigationPending } from "./NavigationPendingProvider";

type PendingContentFallbackProps = {
  variant?: "dashboard" | "detail" | "grid" | "list";
};

function GridSkeleton() {
  return (
    <div className="cards">
      {Array.from({ length: 4 }, (_, index) => (
        <div className="ui-card min-h-[18rem] animate-pulse p-4" key={index}>
          <div className="h-48 rounded-2xl bg-slate-200/70 dark:bg-slate-800/70" />
          <div className="mt-4 h-5 w-2/3 rounded-full bg-slate-200/70 dark:bg-slate-800/70" />
          <div className="mt-3 h-4 w-1/2 rounded-full bg-slate-200/50 dark:bg-slate-800/50" />
        </div>
      ))}
    </div>
  );
}

function ListSkeleton() {
  return (
    <div className="space-y-12">
      {Array.from({ length: 3 }, (_, index) => (
        <section className="space-y-4" key={index}>
          <div className="h-8 w-56 animate-pulse rounded-full bg-slate-200/70 dark:bg-slate-800/70" />
          <div className="professionals px-6 sm:px-12">
            {Array.from({ length: 4 }, (_, cardIndex) => (
              <div
                className="ui-card min-h-[12rem] animate-pulse p-5"
                key={cardIndex}
              >
                <div className="h-5 w-3/4 rounded-full bg-slate-200/70 dark:bg-slate-800/70" />
                <div className="mt-4 h-4 w-1/2 rounded-full bg-slate-200/50 dark:bg-slate-800/50" />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function DetailSkeleton() {
  return (
    <div className="ui-detail-layout">
      <div className="ui-detail-media min-h-[420px] animate-pulse bg-slate-200/60 dark:bg-slate-800/60" />
      <div className="ui-detail-sidebar space-y-5">
        <div className="h-4 w-24 rounded-full bg-slate-200/70 dark:bg-slate-800/70" />
        <div className="h-10 w-2/3 rounded-full bg-slate-200/70 dark:bg-slate-800/70" />
        <div className="h-24 w-full rounded-3xl bg-slate-200/50 dark:bg-slate-800/50" />
        <div className="h-12 w-full rounded-2xl bg-slate-200/50 dark:bg-slate-800/50" />
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div className="ui-panel min-h-[24rem] animate-pulse bg-slate-200/60 dark:bg-slate-800/60" />
        <div className="ui-panel min-h-[24rem] animate-pulse bg-slate-200/40 dark:bg-slate-800/40" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {Array.from({ length: 5 }, (_, index) => (
          <div
            className="ui-panel min-h-[10rem] animate-pulse bg-slate-200/40 dark:bg-slate-800/40"
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

function renderVariant(variant: PendingContentFallbackProps["variant"]) {
  switch (variant) {
    case "detail":
      return <DetailSkeleton />;
    case "list":
      return <ListSkeleton />;
    case "dashboard":
      return <DashboardSkeleton />;
    case "grid":
    default:
      return <GridSkeleton />;
  }
}

export default function PendingContentFallback({
  variant = "grid",
}: PendingContentFallbackProps) {
  const { finishPending, startPending } = useNavigationPending();

  useEffect(() => {
    startPending();

    return () => {
      finishPending();
    };
  }, [finishPending, startPending]);

  return renderVariant(variant);
}
