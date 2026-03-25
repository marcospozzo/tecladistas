"use client";

import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import ThemeRegistry from "./ThemeRegistry";

export default function Provider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}): React.ReactNode {
  return (
    <SessionProvider session={session}>
      <ThemeRegistry>{children}</ThemeRegistry>
    </SessionProvider>
  );
}
