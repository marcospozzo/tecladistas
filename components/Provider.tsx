"use client";

import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";

import AppThemeProvider from "./theme/AppThemeProvider";
import { ResolvedTheme, ThemePreference } from "./theme/theme";

export default function Provider({
  children,
  initialResolvedTheme,
  initialThemePreference,
  session,
}: {
  children: React.ReactNode;
  initialResolvedTheme?: ResolvedTheme;
  initialThemePreference: ThemePreference;
  session: Session | null;
}): React.ReactNode {
  return (
    <SessionProvider session={session}>
      <AppThemeProvider
        initialResolvedTheme={initialResolvedTheme}
        initialThemePreference={initialThemePreference}
      >
        {children}
      </AppThemeProvider>
    </SessionProvider>
  );
}
