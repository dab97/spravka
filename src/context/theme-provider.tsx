import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Theme = "dark" | "light" | "system";
type ResolvedTheme = "dark" | "light";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  /* Тема, фактически применённая к <html>: system разрешается по matchMedia */
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
};

/* Ключ должен совпадать с inline-скриптом в index.html (P1-1) */
export const THEME_STORAGE_KEY = "spravka-ui-theme";
const SYSTEM_DARK_QUERY = "(prefers-color-scheme: dark)";

const ThemeProviderContext = createContext<ThemeProviderState | null>(null);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = THEME_STORAGE_KEY,
  ...props
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  /* Системная тема в состоянии: подписка применяет смену темы ОС на лету (P1-2) */
  const [systemDark, setSystemDark] = useState(
    () => window.matchMedia(SYSTEM_DARK_QUERY).matches
  );

  useEffect(() => {
    const mq = window.matchMedia(SYSTEM_DARK_QUERY);
    const onChange = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme === "system" ? (systemDark ? "dark" : "light") : theme);
  }, [theme, systemDark]);

  const value = useMemo<ThemeProviderState>(
    () => ({
      theme,
      resolvedTheme: theme === "system" ? (systemDark ? "dark" : "light") : theme,
      setTheme: (next: Theme) => {
        localStorage.setItem(storageKey, next);
        setThemeState(next);
      },
    }),
    [theme, systemDark, storageKey]
  );

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeProviderContext);

  if (!context)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
}
