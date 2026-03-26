export const THEME_PREFERENCES = ["system", "light", "dark"] as const;

export type ThemePreference = (typeof THEME_PREFERENCES)[number];
export type ResolvedTheme = Exclude<ThemePreference, "system">;

export const DEFAULT_THEME_PREFERENCE: ThemePreference = "system";
export const THEME_STORAGE_KEY = "tecladistas-theme-preference";
export const THEME_COOKIE_NAME = "tecladistas-theme-preference";
export const THEME_RESOLVED_COOKIE_NAME = "tecladistas-resolved-theme";
export const THEME_MEDIA_QUERY = "(prefers-color-scheme: dark)";

const THEME_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function isThemePreference(
  value: string | null | undefined
): value is ThemePreference {
  return (
    value === "system" ||
    value === "light" ||
    value === "dark"
  );
}

export function isResolvedTheme(
  value: string | null | undefined
): value is ResolvedTheme {
  return value === "light" || value === "dark";
}

export function getResolvedTheme(
  value: string | null | undefined
): ResolvedTheme | undefined {
  return isResolvedTheme(value) ? value : undefined;
}

export function getThemePreference(
  value: string | null | undefined
): ThemePreference {
  return isThemePreference(value) ? value : DEFAULT_THEME_PREFERENCE;
}

export function resolveThemePreference(
  themePreference: ThemePreference,
  systemPrefersDark: boolean
): ResolvedTheme {
  if (themePreference === "system") {
    return systemPrefersDark ? "dark" : "light";
  }

  return themePreference;
}

export function getServerResolvedTheme(
  themePreference: ThemePreference,
  storedResolvedTheme?: string | null | undefined
): ResolvedTheme | undefined {
  if (themePreference !== "system") {
    return themePreference;
  }

  return getResolvedTheme(storedResolvedTheme);
}

export function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia(THEME_MEDIA_QUERY).matches ? "dark" : "light";
}

export function getDocumentThemePreference(
  fallbackThemePreference: ThemePreference = DEFAULT_THEME_PREFERENCE
): ThemePreference {
  if (typeof document === "undefined") {
    return fallbackThemePreference;
  }

  return getThemePreference(
    document.documentElement.dataset.themePreference ??
      document.documentElement.getAttribute("data-theme-preference")
  );
}

export function getDocumentResolvedTheme(
  fallbackThemePreference: ThemePreference = DEFAULT_THEME_PREFERENCE
): ResolvedTheme {
  if (typeof document === "undefined") {
    return fallbackThemePreference === "dark" ? "dark" : "light";
  }

  const documentTheme = document.documentElement.dataset.theme;

  if (isResolvedTheme(documentTheme)) {
    return documentTheme;
  }

  return resolveThemePreference(
    getDocumentThemePreference(fallbackThemePreference),
    getSystemTheme() === "dark"
  );
}

export function applyThemeToDocument(
  themePreference: ThemePreference,
  resolvedTheme: ResolvedTheme
) {
  if (typeof document === "undefined") {
    return;
  }

  const root = document.documentElement;

  root.dataset.themePreference = themePreference;
  root.dataset.theme = resolvedTheme;
  root.style.colorScheme = resolvedTheme;
  root.classList.toggle("dark", resolvedTheme === "dark");
}

export function persistThemePreference(
  themePreference: ThemePreference,
  resolvedTheme: ResolvedTheme
) {
  if (typeof document === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, themePreference);
  } catch {}

  const secureFlag =
    typeof window !== "undefined" && window.location.protocol === "https:"
      ? "; Secure"
      : "";

  document.cookie = `${THEME_COOKIE_NAME}=${themePreference}; Path=/; Max-Age=${THEME_COOKIE_MAX_AGE}; SameSite=Lax${secureFlag}`;
  document.cookie = `${THEME_RESOLVED_COOKIE_NAME}=${resolvedTheme}; Path=/; Max-Age=${THEME_COOKIE_MAX_AGE}; SameSite=Lax${secureFlag}`;
}

export function getThemeInitScript() {
  return `
    (function () {
      var root = document.documentElement;
      var themeStorageKey = ${JSON.stringify(THEME_STORAGE_KEY)};
      var themeCookieName = ${JSON.stringify(THEME_COOKIE_NAME)};
      var resolvedThemeCookieName = ${JSON.stringify(THEME_RESOLVED_COOKIE_NAME)};
      var defaultThemePreference = ${JSON.stringify(DEFAULT_THEME_PREFERENCE)};
      var themeMediaQuery = ${JSON.stringify(THEME_MEDIA_QUERY)};
      var maxAge = ${THEME_COOKIE_MAX_AGE};
      var rawThemePreference = root.dataset.themePreference;

      try {
        var storedThemePreference = window.localStorage.getItem(themeStorageKey);

        if (
          storedThemePreference === "system" ||
          storedThemePreference === "light" ||
          storedThemePreference === "dark"
        ) {
          rawThemePreference = storedThemePreference;
        }
      } catch (error) {}

      var themePreference =
        rawThemePreference === "light" ||
        rawThemePreference === "dark" ||
        rawThemePreference === "system"
          ? rawThemePreference
          : defaultThemePreference;
      var resolvedTheme =
        themePreference === "system"
          ? window.matchMedia(themeMediaQuery).matches
            ? "dark"
            : "light"
          : themePreference;
      var secureFlag =
        window.location.protocol === "https:" ? "; Secure" : "";

      root.dataset.themePreference = themePreference;
      root.dataset.theme = resolvedTheme;
      root.style.colorScheme = resolvedTheme;
      root.classList.toggle("dark", resolvedTheme === "dark");

      try {
        window.localStorage.setItem(themeStorageKey, themePreference);
      } catch (error) {}

      document.cookie =
        themeCookieName +
        "=" +
        themePreference +
        "; Path=/; Max-Age=" +
        maxAge +
        "; SameSite=Lax" +
        secureFlag;
      document.cookie =
        resolvedThemeCookieName +
        "=" +
        resolvedTheme +
        "; Path=/; Max-Age=" +
        maxAge +
        "; SameSite=Lax" +
        secureFlag;
    })();
  `;
}
