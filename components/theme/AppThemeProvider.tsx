"use client";

import * as React from "react";

import ThemeRegistry from "@/components/ThemeRegistry";

import {
  DEFAULT_THEME_PREFERENCE,
  ResolvedTheme,
  ThemePreference,
  THEME_MEDIA_QUERY,
  applyThemeToDocument,
  getDocumentResolvedTheme,
  getDocumentThemePreference,
  persistThemePreference,
} from "./theme";

type AppThemeContextValue = {
  themePreference: ThemePreference;
  resolvedTheme: ResolvedTheme;
  setThemePreference: React.Dispatch<React.SetStateAction<ThemePreference>>;
};

const AppThemeContext = React.createContext<AppThemeContextValue | null>(null);

export default function AppThemeProvider({
  children,
  initialThemePreference = DEFAULT_THEME_PREFERENCE,
  initialResolvedTheme = "light",
}: {
  children: React.ReactNode;
  initialThemePreference?: ThemePreference;
  initialResolvedTheme?: ResolvedTheme;
}) {
  const [hasSyncedWithDocument, setHasSyncedWithDocument] = React.useState(
    false
  );
  const [themePreference, setThemePreference] = React.useState<ThemePreference>(
    initialThemePreference
  );
  const [systemTheme, setSystemTheme] = React.useState<ResolvedTheme>(
    initialResolvedTheme
  );

  const resolvedTheme =
    themePreference === "system" ? systemTheme : themePreference;

  React.useLayoutEffect(() => {
    setThemePreference(getDocumentThemePreference(initialThemePreference));
    setSystemTheme(getDocumentResolvedTheme(initialThemePreference));
    setHasSyncedWithDocument(true);
  }, [initialThemePreference]);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(THEME_MEDIA_QUERY);

    const updateSystemTheme = () => {
      setSystemTheme(mediaQuery.matches ? "dark" : "light");
    };

    updateSystemTheme();

    mediaQuery.addEventListener("change", updateSystemTheme);

    return () => {
      mediaQuery.removeEventListener("change", updateSystemTheme);
    };
  }, []);

  React.useEffect(() => {
    if (!hasSyncedWithDocument) {
      return;
    }

    persistThemePreference(themePreference, resolvedTheme);
  }, [hasSyncedWithDocument, resolvedTheme, themePreference]);

  React.useEffect(() => {
    if (!hasSyncedWithDocument) {
      return;
    }

    applyThemeToDocument(themePreference, resolvedTheme);
  }, [hasSyncedWithDocument, resolvedTheme, themePreference]);

  return (
    <AppThemeContext.Provider
      value={{ resolvedTheme, setThemePreference, themePreference }}
    >
      <ThemeRegistry mode={resolvedTheme}>{children}</ThemeRegistry>
    </AppThemeContext.Provider>
  );
}

export function useAppTheme() {
  const context = React.useContext(AppThemeContext);

  if (!context) {
    throw new Error("useAppTheme debe usarse dentro de AppThemeProvider");
  }

  return context;
}
