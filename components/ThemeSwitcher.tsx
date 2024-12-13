"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute("class", theme);
      document.documentElement.style.colorScheme = theme;
    }
  }, [theme]);

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="fixed rounded-full top-10 left-6 sm:top-auto sm:left-auto sm:bottom-6 sm:right-6 z-50"
    >
      {theme === "dark" ? <SunIcon className="h-[1.2rem] w-[1.2rem]" /> : <MoonIcon className="h-[1.2rem] w-[1.2rem]" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}