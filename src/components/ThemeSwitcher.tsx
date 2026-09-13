import { useTheme } from "@/context/theme-provider";
import { HugeiconsIcon } from "@hugeicons/react";
import { Sun03Icon, Moon02Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ThemeSwitcherProps {
  className?: string;
  showTooltip?: boolean;
}

export default function ThemeSwitcher({
  className,
  showTooltip = true,
}: ThemeSwitcherProps) {
  const { theme, setTheme } = useTheme();

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  const button = (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative w-9 h-9 rounded-xl border border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-primary/10 dark:hover:bg-primary/20 active:scale-95 transition-all overflow-hidden",
        className
      )}
      aria-label={isDark ? "Включить светлую тему" : "Включить тёмную тему"}
    >
      {/* Солнце (появляется в тёмной теме для перехода на светлую) */}
      <HugeiconsIcon
        icon={Sun03Icon}
        size={18}
        strokeWidth={1.5}
        className={cn(
          "absolute inset-0 m-auto transition-all duration-300 transform",
          isDark
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-90 scale-0 opacity-0 pointer-events-none"
        )}
      />
      {/* Лаконичный полумесяц без кратеров (в светлой теме для перехода на тёмную) */}
      <HugeiconsIcon
        icon={Moon02Icon}
        size={18}
        strokeWidth={1.5}
        className={cn(
          "absolute inset-0 m-auto transition-all duration-300 transform",
          isDark
            ? "rotate-90 scale-0 opacity-0 pointer-events-none"
            : "rotate-0 scale-100 opacity-100"
        )}
      />
      <span className="sr-only">Переключить тему</span>
    </Button>
  );

  if (!showTooltip) {
    return button;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {button}
      </TooltipTrigger>
      <TooltipContent side="bottom" className="text-xs">
        {isDark ? "Включить светлую тему" : "Включить тёмную тему"}
      </TooltipContent>
    </Tooltip>
  );
}
