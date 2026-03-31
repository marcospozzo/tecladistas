"use client";

import { createContext, useContext, useMemo, useState } from "react";

type NavigationPendingContextValue = {
  finishPending: () => void;
  isPending: boolean;
  startPending: () => void;
};

const NavigationPendingContext = createContext<
  NavigationPendingContextValue | undefined
>(undefined);

export function NavigationPendingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [pendingCount, setPendingCount] = useState(0);

  const value = useMemo(
    () => ({
      isPending: pendingCount > 0,
      startPending: () => setPendingCount((currentCount) => currentCount + 1),
      finishPending: () =>
        setPendingCount((currentCount) =>
          currentCount > 0 ? currentCount - 1 : 0,
        ),
    }),
    [pendingCount],
  );

  return (
    <NavigationPendingContext.Provider value={value}>
      {children}
    </NavigationPendingContext.Provider>
  );
}

export function useNavigationPending() {
  const context = useContext(NavigationPendingContext);

  if (!context) {
    throw new Error(
      "useNavigationPending must be used within NavigationPendingProvider",
    );
  }

  return context;
}
